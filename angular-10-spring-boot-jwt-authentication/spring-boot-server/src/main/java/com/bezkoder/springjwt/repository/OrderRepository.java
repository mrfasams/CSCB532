package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.Order;
import com.bezkoder.springjwt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	Optional<Order> findByDescription(String name);

	List<Order> findBySenderOrReceiverUser(User sender, User receiver);
	List<Order> findByCompanyOfficeIn(List<Long> officeIds);

	@Query(value="select * from orders e where e.sender_user_id =  :user or e.receiver_user_id = :user", nativeQuery=true)
	List<Order> findBySenderOrReceiver(Long user);
	@Query(value="select * from orders e where company_office_id in (select id from company_office where logistic_company_id = (select logistic_company_id from company_office where id in (select company_office_id from company_office_office_employee where office_employee_id = :user)))", nativeQuery=true)
	List<Order> findAllOrderForCompany(Long user);


	@Query(value="select * from orders e where e.employee_id =  :user ", nativeQuery=true)
	List<Order> findByOrdersByEmployee(Long user);

	@Query(value="select * from orders e where order_status not like 2 and  company_office_id in (select id from company_office where logistic_company_id = (select logistic_company_id from company_office where id in (select company_office_id from company_office_office_employee where office_employee_id = :user)))", nativeQuery=true)
	List<Order> findByOrdersNotReceivedForCompany(Long user);

	@Query(value="select * from orders e where e.sender_user_id =  :user ", nativeQuery=true)
	List<Order> findByOrdersByClientSend(Long user);
	@Query(value="select * from orders e where e.receiver_user_id =  :user ", nativeQuery=true)
	List<Order> findByOrdersByClientReceived(Long user);
}

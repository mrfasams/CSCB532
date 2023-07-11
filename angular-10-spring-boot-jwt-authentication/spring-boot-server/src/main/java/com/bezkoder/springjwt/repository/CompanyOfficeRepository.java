package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.CompanyOffice;
import com.bezkoder.springjwt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyOfficeRepository extends JpaRepository<CompanyOffice, Long> {
	Optional<CompanyOffice> findByName(String name);
	Optional<CompanyOffice> findByOfficeEmployee(User id);
	List<CompanyOffice> findByLogisticCompanyId(Long id);
	Optional<CompanyOffice> findByOfficeEmployeeAndId(User name,Long officeId);

	@Query(value="select * from company_office where id =   :id ", nativeQuery=true)
	Optional<CompanyOffice> findByOfficeId(Long id);


	@Query(value="select * from company_office where id = (select company_office_id from company_office_office_employee e where e.office_employee_id =  :id) ", nativeQuery=true)
	Optional<CompanyOffice> findByOfficeEmployeeByUser(Long id);
}

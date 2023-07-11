package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.LogisticCompany;
import com.bezkoder.springjwt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<LogisticCompany, Long> {
	Optional<LogisticCompany> findByName(String name);
	Optional<LogisticCompany> findByCompanyClientsAndId(User name,Long companyId);
	List<LogisticCompany> findByCompanyClients(User user);

	@Query("select e from LogisticCompany e where e.id in :ids")
	public List<LogisticCompany> getCompByIds(@Param("ids") List<Long> ids);
	List<LogisticCompany> findByIdIn(List<Long> companyIds);

	@Query(value="select * from logistic_company e where e.id in :companyIds", nativeQuery=true)
	List<LogisticCompany> findByCompId(List<Long> companyIds);

}

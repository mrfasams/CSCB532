package com.bezkoder.springjwt.models;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import java.util.Set;

@Entity
@Table(	name = "company_office")
public class CompanyOffice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	private String name;

	@Column(name="logistic_company_id")
	private Long logisticCompanyId;

	/*@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	//Adding the name
	@JoinColumn
	private LogisticCompany logisticCompany;
*/

	// Mapping to the other table
	@OneToMany(cascade = CascadeType.ALL)
	private Set<User> officeEmployee;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
/*
	public LogisticCompany getLogisticCompany() {
		return logisticCompany;
	}

	public void setLogisticCompany(LogisticCompany logisticCompany) {
		this.logisticCompany = logisticCompany;
	}

 */

	public Set<User> getOfficeEmployee() {
		return officeEmployee;
	}

	public void setOfficeEmployee(Set<User> officeEmployee) {
		this.officeEmployee = officeEmployee;
	}

	public Long getLogisticCompanyId() {
		return logisticCompanyId;
	}

	public void setLogisticCompanyId(Long logisticCompanyId) {
		this.logisticCompanyId = logisticCompanyId;
	}

	@Override
	public String toString() {
		return "CompanyOffice{" +
			"id=" + id +
			", name='" + name + '\'' +
			", logisticCompanyId=" + logisticCompanyId +
			", officeEmployee=" + officeEmployee +
			'}';
	}
}

package com.bezkoder.springjwt.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(	name = "logistic_company")
public class LogisticCompany {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	private String name;


	@ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	@JoinTable(	name = "company_client",
		joinColumns = @JoinColumn(name = "company_id"),
		inverseJoinColumns = @JoinColumn(name = "client_id"))
	private Set<User> companyClients = new HashSet<>();

	@Transient
	private boolean isChecked = false;

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

	public Set<User> getCompanyClients() {
		return companyClients;
	}

	public void setCompanyClients(Set<User> companyClients) {
		this.companyClients = companyClients;
	}

	public boolean isChecked() {
		return isChecked;
	}

	public void setChecked(boolean checked) {
		isChecked = checked;
	}
}

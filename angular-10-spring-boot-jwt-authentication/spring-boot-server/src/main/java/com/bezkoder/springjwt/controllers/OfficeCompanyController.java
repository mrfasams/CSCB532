package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.models.CompanyOffice;
import com.bezkoder.springjwt.models.LogisticCompany;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.CompanyOfficeRepository;
import com.bezkoder.springjwt.repository.CompanyRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class OfficeCompanyController {

	@Autowired
	CompanyOfficeRepository companyOfficeRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	CompanyRepository companyRepository;

	@GetMapping("/companyoffice")
	public ResponseEntity<List<CompanyOffice>> getAllCompanyOffice(@RequestParam(required = false) String title) {
		try {
			List<CompanyOffice> logisticCompanies = new ArrayList<CompanyOffice>();

			if (title == null)
				companyOfficeRepository.findAll().forEach(logisticCompanies::add);

			if (logisticCompanies.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(logisticCompanies, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/companyoffice/{id}")
	public ResponseEntity<CompanyOffice> getCompanyOfficeById(@PathVariable("id") long id) {
		Optional<CompanyOffice> companyOffice = companyOfficeRepository.findById(id);

		if (companyOffice.isPresent()) {
			return new ResponseEntity<>(companyOffice.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/companyoffice/user/{id}")
	public ResponseEntity<CompanyOffice> getCompanyOfficeByUserId(@PathVariable("id") long id) {
		Optional<User> user = userRepository.findById(id);
		Optional<CompanyOffice> companyOffice = companyOfficeRepository.findByOfficeEmployee(user.get());

		if (companyOffice.isPresent()) {
			return new ResponseEntity<>(companyOffice.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


	@DeleteMapping("/companyoffice/{id}")
	public ResponseEntity<HttpStatus> deleteCompany(@PathVariable("id") long id) {
		try {
			companyOfficeRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/companyoffice")
	public ResponseEntity<HttpStatus> deleteAllCompany() {
		try {
			companyOfficeRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}


	@PutMapping("/companyoffice/{id}")
	public ResponseEntity<CompanyOffice> updateCompany(@PathVariable("id") long id, @RequestBody CompanyOffice logisticCompany1) {
		Optional<CompanyOffice> logisticCompanyEntity = companyOfficeRepository.findById(id);

		if (logisticCompanyEntity.isPresent()) {
			CompanyOffice logisticCompany = logisticCompanyEntity.get();
			logisticCompany.setName(logisticCompany1.getName());

			//logisticCompany.getUsers().clear();
			//logisticCompany.getUsers().addAll(logisticCompany1.getUsers());


			return new ResponseEntity<>(companyOfficeRepository.save(logisticCompany), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/companyoffice")
	public ResponseEntity<?> registerCompany(@RequestBody CompanyOffice logisticCompany) {
		System.out.println(logisticCompany.toString());
		CompanyOffice savedLogisticCompany = companyOfficeRepository.save(logisticCompany);
		if (savedLogisticCompany == null) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} else {
			return new ResponseEntity<>(savedLogisticCompany, HttpStatus.CREATED);
		}
	}

	@GetMapping("/companyoffice/company/{id}")
	public ResponseEntity<List<CompanyOffice>> getCompanyOfficeByCompanyId(@PathVariable("id") long id) {
		Optional<LogisticCompany> company = companyRepository.findById(id);
		List<CompanyOffice> companyOffice = companyOfficeRepository.findByLogisticCompanyId(company.get().getId());


			return new ResponseEntity<>(companyOffice, HttpStatus.OK);

	}

}

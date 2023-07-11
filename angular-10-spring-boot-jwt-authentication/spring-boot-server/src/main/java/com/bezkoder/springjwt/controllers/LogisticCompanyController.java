package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.models.LogisticCompany;
import com.bezkoder.springjwt.models.User;
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
public class LogisticCompanyController {

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	UserRepository userRepository;

	@GetMapping("/company")
	public ResponseEntity<List<LogisticCompany>> getAllCompany(@RequestParam(required = false) String title) {
		try {
			List<LogisticCompany> logisticCompanies = new ArrayList<LogisticCompany>();

			if (title == null)
				companyRepository.findAll().forEach(logisticCompanies::add);

			if (logisticCompanies.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(logisticCompanies, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/company/{id}")
	public ResponseEntity<LogisticCompany> getUserById(@PathVariable("id") long id) {
		Optional<LogisticCompany> LogisticCompany = companyRepository.findById(id);

		if (LogisticCompany.isPresent()) {
			return new ResponseEntity<>(LogisticCompany.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


	@DeleteMapping("/company/{id}")
	public ResponseEntity<HttpStatus> deleteCompany(@PathVariable("id") long id) {
		try {
			companyRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/company")
	public ResponseEntity<HttpStatus> deleteAllCompany() {
		try {
			companyRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	/*@GetMapping("/user/active")
	public ResponseEntity<List<User>> findByPublished() {
		try {
			List<User> tutorials = userRepository.findByPublished(true);

			if (tutorials.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(tutorials, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}*/


	@PutMapping("/company/{id}")
	public ResponseEntity<LogisticCompany> updateCompany(@PathVariable("id") long id, @RequestBody LogisticCompany logisticCompany1) {
		Optional<LogisticCompany> logisticCompanyEntity = companyRepository.findById(id);

		if (logisticCompanyEntity.isPresent()) {
			LogisticCompany logisticCompany = logisticCompanyEntity.get();
			logisticCompany.setName(logisticCompany1.getName());

			//logisticCompany.getUsers().clear();
			//logisticCompany.getUsers().addAll(logisticCompany1.getUsers());


			return new ResponseEntity<>(companyRepository.save(logisticCompany), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

		@PostMapping("/company")
	public ResponseEntity<?> registerCompany(@RequestBody LogisticCompany logisticCompany) {
		LogisticCompany savedLogisticCompany = companyRepository.save(logisticCompany);
		if (savedLogisticCompany == null) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} else {
		return new ResponseEntity<>(savedLogisticCompany, HttpStatus.CREATED);
		}
	}
	@GetMapping("/company/user/{id}")
	public ResponseEntity<List<LogisticCompany>> getCompaniesByUserId(@PathVariable("id") long id) {
		Optional<User> user = userRepository.findById(id);
		List<LogisticCompany> companiesForClient = companyRepository.findByCompanyClients(user.get());

		return new ResponseEntity<>(companiesForClient, HttpStatus.OK);

	}

	@GetMapping("/company/user2/{id}")
	public ResponseEntity<List<LogisticCompany>> getCompaniesByUserId2(@PathVariable("id") long id) {
		Optional<User> user = userRepository.findById(id);
		List<LogisticCompany> companiesForClient = companyRepository.findByCompanyClients(user.get());
		List<LogisticCompany> allComp = companyRepository.findAll();
		List<LogisticCompany> result = new ArrayList<>();
		allComp.forEach(e->{
				boolean isResult = companiesForClient.stream().anyMatch(g->g.getId().equals(e.getId()));
				if(isResult) {
					e.setChecked(true);
				}
		result.add(e);
	}
			);
		return new ResponseEntity<>(result, HttpStatus.OK);

	}


}

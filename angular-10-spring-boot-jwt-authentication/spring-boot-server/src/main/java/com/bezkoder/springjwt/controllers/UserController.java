package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.models.CompanyOffice;
import com.bezkoder.springjwt.models.LogisticCompany;
import com.bezkoder.springjwt.models.Order;
import com.bezkoder.springjwt.models.Role;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.repository.CompanyOfficeRepository;
import com.bezkoder.springjwt.repository.CompanyRepository;
import com.bezkoder.springjwt.repository.OrderRepository;
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
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	CompanyOfficeRepository companyOfficeRepository;

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	OrderRepository orderRepository;

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String title) {
		try {
			List<User> users = new ArrayList<User>();

			if (title == null)
				userRepository.findAll().forEach(users::add);

			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
		Optional<User> tutorialData = userRepository.findById(id);


		if (tutorialData.isPresent()) {
			return new ResponseEntity<>(tutorialData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


	@DeleteMapping("/users/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
		try {

			List<Order> userOrders = orderRepository.findBySenderOrReceiver(id);
			if(!userOrders.isEmpty()) {
				userOrders.forEach(order -> {
					orderRepository.deleteById(order.getId());
				});
			}

			//delete from company
			Optional<User> user = userRepository.findById(id);
			List<LogisticCompany> userBelongsToCompanies  = companyRepository.findByCompanyClients(user.get());
			System.out.println("userBelongsToCompanies  " + userBelongsToCompanies.isEmpty());
			if(!userBelongsToCompanies.isEmpty()) {

				userBelongsToCompanies.forEach(c -> {
					c.getCompanyClients().removeIf(e -> e.getId().equals(user.get().getId()));
					companyRepository.saveAndFlush(c);
				});
			}
			userRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/users")
	public ResponseEntity<HttpStatus> deleteAllUsers() {
		try {
			userRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}


	@PostMapping("/users/login")
	public ResponseEntity<User> getUserByLogin(@RequestBody User userToUpdate) {
		List<User> userData = userRepository.findByUsernameAndPassword(userToUpdate.getUsername(),userToUpdate.getPassword());

		if (!userData.isEmpty()) {
			return new ResponseEntity<>(userData.get(0), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


	@RequestMapping("/login")
	public boolean login(@RequestBody User user) {

		List<User> userData = userRepository.findByUsernameAndPassword(user.getUsername(),user.getPassword());

		if (!userData.isEmpty()) {
			return true;
		} else {
			return false;
		}
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User userToUpdate) {
		Optional<User> userEntity = userRepository.findById(id);
		if(userToUpdate.getCompanyId() != null) {
			Optional<LogisticCompany> company = companyRepository.findById(userToUpdate.getCompanyId());
		}


		if (userEntity.isPresent()) {
			final User user = userEntity.get();
			user.setUsername(userToUpdate.getUsername());
			user.setEmail(userToUpdate.getEmail());
			user.setPassword(userToUpdate.getPassword());
			user.setFirstName(userToUpdate.getFirstName());
			user.setLastName(userToUpdate.getLastName());
			user.getRoles().clear();
			user.getRoles().addAll(userToUpdate.getRoles());
			userRepository.saveAndFlush(user);
			for (Role role : user.getRoles()) {

				System.out.println("Roles : are ");
				System.out.println(role.getId() + " : " + role.getName());
			}

			boolean isClient = userEntity.get().getRoles().stream().collect(Collectors.toList()).get(0).getId() == 1;
			System.out.println("(saved.getId()" + userEntity.get().getId());
			if (!isClient) {
				Optional<CompanyOffice> userOffice =  companyOfficeRepository.findByOfficeEmployeeByUser(userEntity.get().getId());
				//ako smeni rabotnoto mqsto

				if(userOffice.isPresent()) {
					if(!userOffice.get().getId().equals(userToUpdate.getOfficeId())){
						userOffice.get().getOfficeEmployee().remove(user);
						companyOfficeRepository.saveAndFlush(userOffice.get());

						Optional<CompanyOffice> newUserOffice =  companyOfficeRepository.findByOfficeId(userToUpdate.getOfficeId());
						System.out.println("newUserOffice" +userToUpdate.getOfficeId());
						System.out.println("newUserOffice" +newUserOffice.get().getName());
						newUserOffice.get().getOfficeEmployee().add(user);
						companyOfficeRepository.saveAndFlush(newUserOffice.get());
					}
				}



			} else {

				//namirame potrebitelq v koi kompanii e
				List<LogisticCompany> userBelongsToCompanies  = companyRepository.findByCompanyClients(user);
				System.out.println("userBelongsToCompanies  " + userBelongsToCompanies.isEmpty());
				if(!userBelongsToCompanies.isEmpty()) {

					userBelongsToCompanies.forEach(c -> {
						c.getCompanyClients().removeIf(e -> e.getId().equals(user.getId()));
						companyRepository.saveAndFlush(c);
					});
				}
				List<Long> userCompaniesIds = userToUpdate.getClientBelongsToCompany().stream().collect(Collectors.toList());

				 List<LogisticCompany> userCompaniesIdsEmities = companyRepository.findByIdIn(userCompaniesIds);
				if(!userCompaniesIdsEmities.isEmpty()) {
					userCompaniesIdsEmities.forEach(c -> {
						c.getCompanyClients().add(user);
						System.out.println("user Companies  " + c.getName());
						companyRepository.saveAndFlush(c);
					});
				}else {
					System.out.println("user Companies  emtpy");
				}
		}
			return new ResponseEntity<>( HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


}

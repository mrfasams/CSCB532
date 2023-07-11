package com.bezkoder.springjwt.controllers;


import com.bezkoder.springjwt.models.CompanyOffice;
import com.bezkoder.springjwt.models.EStatus;
import com.bezkoder.springjwt.models.Order;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.request.OrderRequest;
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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class OrderController {

	private final BigDecimal FIXED_PRICE_WEIGHT_BY_KILO = new BigDecimal("2.50");
	private final BigDecimal FIXED_PRICE_RECEIVED_IN_OFFICE =  new BigDecimal("3.20");


	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	OrderRepository orderRepository;

	@Autowired
	CompanyOfficeRepository companyOfficeRepository;

	@GetMapping("/order")
	public ResponseEntity<List<Order>> getAllOrders(@RequestParam(required = false) String title) {
		try {
			List<Order> logisticOrders = new ArrayList<Order>();

			if (title == null)
				orderRepository.findAll().forEach(logisticOrders::add);

			if (logisticOrders.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(logisticOrders, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/order/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable("id") long id) {
		Optional<Order> LogisticOrder = orderRepository.findById(id);

		if (LogisticOrder.isPresent()) {
			return new ResponseEntity<>(LogisticOrder.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


	@DeleteMapping("/order/{id}")
	public ResponseEntity<HttpStatus> deleteOrder(@PathVariable("id") long id) {
		try {
			orderRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/order")
	public ResponseEntity<HttpStatus> deleteAllOrder() {
		try {
			orderRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}



	@PutMapping("/order/{id}")
	public ResponseEntity<Order> updateOrder(@PathVariable("id") long id, @RequestBody OrderRequest order) {
		Optional<Order> logisticOrderEntity = orderRepository.findById(id);

		if (logisticOrderEntity.isPresent()) {
			Order newOrder = logisticOrderEntity.get();

			Optional<com.bezkoder.springjwt.models.User> employee = userRepository.findById(order.getEmployee());
			Optional<com.bezkoder.springjwt.models.User> clientFrom = userRepository.findById(order.getSenderUser());
			Optional<com.bezkoder.springjwt.models.User> clientTo = userRepository.findById(order.getReceiverUser());
			Optional<CompanyOffice> companyOffice = companyOfficeRepository.findById(order.getCompanyOffice());
			newOrder.setDescription(order.getDescription());
			newOrder.setOrderStatus(com.bezkoder.springjwt.models.EStatus.PENDING);
			newOrder.setPlacedOrderDate(new Date());
			newOrder.setEmployee(employee.get());
			newOrder.setSenderUser(clientTo.get());
			newOrder.setReceiverUser(clientFrom.get());
			newOrder.setReceivedInOffice(order.isReceivedInOffice());
			newOrder.setPrice(calulatePrice(order.getWeight(), order.isReceivedInOffice()));
			newOrder.setWeight(new BigDecimal(order.getWeight()));
			newOrder.setCompanyOffice(companyOffice.get());
			newOrder.setRecipient(order.getRecipient());
			newOrder.setSender(order.getSender());

			return new ResponseEntity<>(orderRepository.save(newOrder), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/order")
	public ResponseEntity<?> registerOrder(@RequestBody Order logisticOrder) {


			Order savedLogisticOrder = orderRepository.save(logisticOrder);
		if (savedLogisticOrder == null) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} else {
		return new ResponseEntity<>(savedLogisticOrder, HttpStatus.CREATED);
		}
	}

	@PostMapping("/orderregister")
	public ResponseEntity<?> registerOrder(@RequestBody OrderRequest order) {
		Order newOrder = null;

		if (order.getId() != null) {
			Optional<Order> logisticOrderEntity = orderRepository.findById(order.getId());
			if (logisticOrderEntity.isPresent()) {
				newOrder = logisticOrderEntity.get();
				newOrder.setOrderStatus(com.bezkoder.springjwt.models.EStatus.valueOf(order.getOrderStatus()));
				EStatus currentStatus = newOrder.getOrderStatus();
				if(currentStatus.equals(EStatus.RECEIVED)){
					newOrder.setReceivedOrderDate( new Date());
				}
			}
		} else {
			newOrder = new Order();
			newOrder.setOrderStatus(com.bezkoder.springjwt.models.EStatus.PENDING);
		}

		Optional<com.bezkoder.springjwt.models.User> employee = userRepository.findById(order.getEmployee());
		Optional<com.bezkoder.springjwt.models.User> client = userRepository.findById(order.getSenderUser());
		Optional<CompanyOffice> companyOffice = companyOfficeRepository.findById(order.getCompanyOffice());
		Optional<com.bezkoder.springjwt.models.User> clientTo = userRepository.findById(order.getReceiverUser());
		newOrder.setDescription(order.getDescription());
		newOrder.setPlacedOrderDate(new Date());
		newOrder.setEmployee(employee.get());
		newOrder.setSenderUser(client.get());
		newOrder.setReceivedInOffice(order.isReceivedInOffice());
		if(order.isReceivedInOffice()) {
			Optional<CompanyOffice> companyOfficeTo = companyOfficeRepository.findById(order.getCompanyOfficeTo());
			newOrder.setCompanyOfficeTo(companyOfficeTo.get());
		}else {
			newOrder.setShippingAddress(order.getShippingAddress());
			newOrder.setCompanyOfficeTo(null);
		}
		newOrder.setPrice(calulatePrice(order.getWeight(), order.isReceivedInOffice()));
		newOrder.setWeight(new BigDecimal(order.getWeight()));
		newOrder.setCompanyOffice(companyOffice.get());
		newOrder.setRecipient(order.getRecipient());
		newOrder.setSender(order.getSender());
		newOrder.setReceiverUser(clientTo.get());
		System.out.println(newOrder.toString());
		Order savedLogisticOrder = orderRepository.save(newOrder);
		if (savedLogisticOrder == null) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} else {
			return new ResponseEntity<>(savedLogisticOrder, HttpStatus.CREATED);
		}
	}


	private BigDecimal calulatePrice(Long weight, boolean isReceivedInOffice) {
		if(isReceivedInOffice) {
			return FIXED_PRICE_RECEIVED_IN_OFFICE.add( BigDecimal.valueOf(weight.longValue())).multiply(FIXED_PRICE_WEIGHT_BY_KILO);
		} else {
			return BigDecimal.valueOf(weight.longValue()) .add(FIXED_PRICE_WEIGHT_BY_KILO);
		}
	}


	@GetMapping("/order/user/{id}")
	public ResponseEntity<List<Order>> getOrderByUserId(@PathVariable("id") long id) {
		Optional<User> user = userRepository.findById(id);
		boolean isClient = user.get().getRoles().stream().collect(Collectors.toList()).get(0).getId() == 1;
		List<Order> orderList = new ArrayList<>();
		if(isClient) {
			orderList = orderRepository.findBySenderOrReceiver(user.get().getId());
		} else {
			/*
			Optional<CompanyOffice> userOffice = companyOfficeRepository.findByOfficeEmployee(user.get());
			Long userCompany = userOffice.get().getLogisticCompanyId();
			List<CompanyOffice> companyOfficeList = companyOfficeRepository.findByLogisticCompanyId(userCompany);
			List<Long> companyOfficeIdsList = companyOfficeList.stream().map(e->e.getId()).collect(Collectors.toList());
			orderList = orderRepository.findByCompanyOfficeIn(companyOfficeIdsList);*/
			orderList = orderRepository.findAllOrderForCompany(user.get().getId());


		}

		if (orderList != null) {
			return new ResponseEntity<>(orderList, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/order/employee/{id}")
	public ResponseEntity<List<Order>> getOrderByEmployeeId(@PathVariable("id") long id) {
		Optional<User> user = userRepository.findById(id);
		List<Order> orderList = orderRepository.findByOrdersByEmployee(id);

		return new ResponseEntity<>(orderList, HttpStatus.OK);

	}

	@GetMapping("/order/notreceived/{id}")
	public ResponseEntity<List<Order>> findByOrdersNotReceivedForCompany(@PathVariable("id") long id) {
		Optional<User> user = userRepository.findById(id);
		List<Order> orderList = orderRepository.findByOrdersNotReceivedForCompany(id);

		return new ResponseEntity<>(orderList, HttpStatus.OK);

	}

	@GetMapping("/order/clientsend/{id}")
	public ResponseEntity<List<Order>> findByOrdersByClientSend(@PathVariable("id") long id) {
		List<Order> orderList = orderRepository.findByOrdersByClientSend(id);
		return new ResponseEntity<>(orderList, HttpStatus.OK);
	}

	@GetMapping("/order/clientReceived/{id}")
	public ResponseEntity<List<Order>> findByOrdersByClientReceived(@PathVariable("id") long id) {
		List<Order> orderList = orderRepository.findByOrdersByClientReceived(id);
		return new ResponseEntity<>(orderList, HttpStatus.OK);
	}

}

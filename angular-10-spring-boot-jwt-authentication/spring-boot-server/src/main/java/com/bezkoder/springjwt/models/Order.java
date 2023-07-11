package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(	name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String description;


	private String sender;


	private String recipient;

	//@NotBlank
	private BigDecimal weight;

	//@NotBlank
	private BigDecimal price = new BigDecimal("2.5");

	private Boolean receivedInOffice;

	private EStatus orderStatus;

	private Date placedOrderDate;

	private Date receivedOrderDate;

	@OneToOne
	private User employee;

	@OneToOne
	private User senderUser;

	@OneToOne(optional = true)
	private CompanyOffice companyOffice;


	private String shippingAddress;

	@OneToOne(optional = true)
	private CompanyOffice companyOfficeTo;

	@OneToOne
	private User receiverUser;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getRecipient() {
		return recipient;
	}

	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}

	public BigDecimal getWeight() {
		return weight;
	}

	public void setWeight(BigDecimal weight) {
		this.weight = weight;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Boolean getReceivedInOffice() {
		return receivedInOffice;
	}

	public void setReceivedInOffice(Boolean receivedInOffice) {
		this.receivedInOffice = receivedInOffice;
	}

	public EStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(EStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Date getPlacedOrderDate() {
		return placedOrderDate;
	}

	public void setPlacedOrderDate(Date placedOrderDate) {
		this.placedOrderDate = placedOrderDate;
	}

	public Date getReceivedOrderDate() {
		return receivedOrderDate;
	}

	public void setReceivedOrderDate(Date receivedOrderDate) {
		this.receivedOrderDate = receivedOrderDate;
	}

	public User getEmployee() {
		return employee;
	}

	public void setEmployee(User employee) {
		this.employee = employee;
	}

	public User getSenderUser() {
		return senderUser;
	}

	public void setSenderUser(User senderUser) {
		this.senderUser = senderUser;
	}

	public CompanyOffice getCompanyOffice() {
		return companyOffice;
	}

	public void setCompanyOffice(CompanyOffice companyOffice) {
		this.companyOffice = companyOffice;
	}

	public String getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	public com.bezkoder.springjwt.models.CompanyOffice getCompanyOfficeTo() {
		return companyOfficeTo;
	}

	public void setCompanyOfficeTo(com.bezkoder.springjwt.models.CompanyOffice companyOfficeTo) {
		this.companyOfficeTo = companyOfficeTo;
	}

	public User getReceiverUser() {
		return receiverUser;
	}

	public void setReceiverUser(User receiverUser) {
		this.receiverUser = receiverUser;
	}

	@Override
	public String toString() {
		return "Order{" +
			"id=" + id +
			", description='" + description + '\'' +
			", sender='" + sender + '\'' +
			", recipient='" + recipient + '\'' +
			", weight=" + weight +
			", price=" + price +
			", receivedInOffice=" + receivedInOffice +
			", orderStatus=" + orderStatus +
			", placedOrderDate=" + placedOrderDate +
			", receivedOrderDate=" + receivedOrderDate +
			", employee=" + employee +
			", senderUser=" + senderUser +
			", companyOffice=" + companyOffice +
			", shippingAddress='" + shippingAddress + '\'' +
			", companyOfficeTo=" + companyOfficeTo +
			", receiverUser=" + receiverUser +
			'}';
	}
}

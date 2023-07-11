package com.bezkoder.springjwt.payload.request;

import javax.validation.constraints.NotBlank;

public class OrderRequest {

	@NotBlank
	private Long id;

	@NotBlank
	private String description;

	private String sender;

	private String recipient;

	@NotBlank
	private Long weight;

	@NotBlank
	private boolean receivedInOffice;

	@NotBlank
	private Long employee;

	@NotBlank
	private Long senderUser;

	@NotBlank
	private Long CompanyOffice;


	private String orderStatus;


	private Long companyOfficeTo;


	private String shippingAddress;

	@NotBlank
	private Long receiverUser;

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

	public Long getWeight() {
		return weight;
	}

	public void setWeight(Long weight) {
		this.weight = weight;
	}

	public boolean isReceivedInOffice() {
		return receivedInOffice;
	}

	public void setReceivedInOffice(boolean receivedInOffice) {
		this.receivedInOffice = receivedInOffice;
	}

	public Long getEmployee() {
		return employee;
	}

	public void setEmployee(Long employee) {
		this.employee = employee;
	}

	public Long getSenderUser() {
		return senderUser;
	}

	public void setSenderUser(Long senderUser) {
		this.senderUser = senderUser;
	}

	public Long getCompanyOffice() {
		return CompanyOffice;
	}

	public void setCompanyOffice(Long companyOffice) {
		CompanyOffice = companyOffice;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Long getCompanyOfficeTo() {
		return companyOfficeTo;
	}

	public void setCompanyOfficeTo(Long companyOfficeTo) {
		this.companyOfficeTo = companyOfficeTo;
	}

	public String getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	public Long getReceiverUser() {
		return receiverUser;
	}

	public void setReceiverUser(Long receiverUser) {
		this.receiverUser = receiverUser;
	}

	@Override
	public String toString() {
		return "OrderRequest{" +
			"id=" + id +
			", description='" + description + '\'' +
			", sender='" + sender + '\'' +
			", recipient='" + recipient + '\'' +
			", weight=" + weight +
			", receivedInOffice=" + receivedInOffice +
			", employee=" + employee +
			", senderUser=" + senderUser +
			", CompanyOffice=" + CompanyOffice +
			", orderStatus='" + orderStatus + '\'' +
			", companyOfficeTo=" + companyOfficeTo +
			", shippingAddress='" + shippingAddress + '\'' +
			", receiverUser=" + receiverUser +
			'}';
	}
}

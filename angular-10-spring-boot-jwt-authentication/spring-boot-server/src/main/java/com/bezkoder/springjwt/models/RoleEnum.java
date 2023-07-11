package com.bezkoder.springjwt.models;

public enum RoleEnum {

	ROLE_USER(1),
	ROLE_COURIER(2),
	ROLE_EMPLOYEE(3);
	int value;
	RoleEnum(int value){
		value = value;
	}
}

package com.bezkoder.springjwt.models;

public enum EStatus {
	PENDING(1),
	SEND(2),
	RECEIVED(3);
	int value;
	EStatus(int value){
		value = value;
	}
}

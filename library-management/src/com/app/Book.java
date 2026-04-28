package com.app;

public class Book {

	private int id;
	private String author;
	private String title;
	private boolean isAvailable;
	
	public Book(int id, String author, String title, boolean isAvailable) {
		super();
		this.id = id;
		this.author = author;
		this.title = title;
		this.isAvailable = isAvailable;
	}
	
	public Book() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean isAvailable() {
		return isAvailable;
	}

	public void setAvailable(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}

	@Override
	public String toString() {
		return "Book [id=" + id + ", author=" + author + ", title=" + title + ", isAvailable=" + isAvailable + "]";
	}
	
	
}

package com.app;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LibraryService {

	private List<User> users = new ArrayList<User>();
	private List<Book> books = new ArrayList<Book>();
	private Map<Integer, Integer> borrowedBooks = new HashMap<Integer, Integer>();

	public void addBook(Book book) {
		books.add(book);
		System.out.println("Book Added Successfully !");
	}

	public void addUser(User user) {
		users.add(user);
		System.out.println("User Added Successfully !");
	}

	public void viewUser() {
		for (User user : users) {
			System.out.println(user);
		}
	}

	public void viewAvailabeBooks() {
		for (Book book : books) {
			if (book.isAvailable()) {
				System.out.println(book);
			}
		}
	}

	public void viewBook() {
		for (Book book : books) {
			System.out.println(book);
		}
	}

	public void borrowBook(int bookId, int userId) {
		Book foundBook = null;
		User foundUser = null;

		// Find book
		for (Book book : books) {
			if (book.getId() == bookId) {
				foundBook = book;
				break;
			}
		}

		// Find user
		for (User user : users) {
			if (user.getId() == userId) {
				foundUser = user;
				break;
			}
		}

		if (foundBook == null) {
			System.out.println("Book Does Not Exist!");
			return;
		}

		if (foundUser == null) {
			System.out.println("User Does Not Exist!");
			return;
		}

		if (!foundBook.isAvailable()) {
			System.out.println("Book Already Borrowed!");
			return;
		}

		foundBook.setAvailable(false);
		borrowedBooks.put(bookId, userId);

		System.out.println("Book Borrowed Successfully!");
	}

	public void searchBook(String keyword) {
		boolean found = false;
		String key = keyword.toLowerCase();
		for (Book book : books) {
			if (book.getAuthor().toLowerCase().contains(key)
					|| book.getTitle().toLowerCase().contains(key)) {

				System.out.println(book);
				found = true;
			}
		}
		if (!found) {
			System.out.println("Book Does Not Exist!");
		}
	}

	public void returnBook(int bookId, int userId) {

		if (borrowedBooks.containsKey(bookId) && borrowedBooks.get(bookId) == userId) {

			borrowedBooks.remove(bookId);

			for (Book book : books) {
				if (book.getId() == bookId) {
					book.setAvailable(true);
					System.out.println("Book Returned Successfully!");
					return;
				}
			}
		}

		System.out.println("Invalid return!");
	}

	public void getBookByUser(int userId) {
		boolean found = false;

		for (Map.Entry<Integer, Integer> entry : borrowedBooks.entrySet()) {
			if (entry.getValue() == userId) {
				System.out.println("User has Book ID: " + entry.getKey());
				found = true;
			}
		}

		if (!found) {
			System.out.println("No books found for this user.");
		}
	}
}

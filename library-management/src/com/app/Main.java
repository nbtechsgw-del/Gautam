package com.app;

import java.util.Scanner;

public class Main {

	public static void main(String[] args) {

		LibraryService service = new LibraryService();
		Scanner sc = new Scanner(System.in);
		int choice;

		do {
			System.out.println("---------------------");
			System.out.println("1. Add Book");
			System.out.println("2. View Books");
			System.out.println("3. Search Book");
			System.out.println("4. View Available Books");
			System.out.println("5. Add User");
			System.out.println("6. View Users");
			System.out.println("7. Borrow Book");
			System.out.println("8. Return Book");
			System.out.println("9. User Borrow Book");
			System.out.println("0. Exit");
			System.out.println("-----------------------");
			System.out.print("Enter Your Choice : ");

			choice = sc.nextInt();
			sc.nextLine();

			switch (choice) {
			case 1:
				System.out.println("-------------------");
				System.out.println("Add Book now");
				System.out.print("Enter Book Id : ");
				try {
					int bookId = sc.nextInt();
					sc.nextLine();
					if (bookId <= 0) {
						System.out.println("Enter valid Book ID (greater than 0)!");
						break;
					}
					System.out.print("Enter Book Title : ");
					String bookTitle = sc.nextLine();
					if (bookTitle.trim().isEmpty()) {
						System.out.println("Title cannot be empty!");
						break;
					}
					System.out.print("Enter Book Author : ");
					String bookAuthor = sc.nextLine();
					if (bookAuthor.trim().isEmpty()) {
						System.out.println("Author cannot be empty!");
						break;
					}
					Book book = new Book(bookId, bookTitle, bookAuthor, true);
					service.addBook(book);
				} catch (Exception e) {
					System.out.println("Invalid input! Please enter a number.");
					sc.nextLine();
					break;
				}

				break;
			case 2:
				System.out.println("\n-------------------");				System.out.println("View Books");
				service.viewBook();
				break;
			case 3:
				System.out.println("\n-------------------");				System.out.println("Search Book By Title or Author ");
				System.out.print("Enter Your Keyword : ");
				String keyword = sc.nextLine();
				service.searchBook(keyword);
				break;
			case 4:
				System.out.println("\n-------------------");				System.out.println("Track Available Books");
				service.viewAvailabeBooks();
				break;
			case 5:
				System.out.println("\n-------------------");				System.out.println("Register User");
				System.out.print("Enter User Id : ");

				try {
					int userId = sc.nextInt();
					sc.nextLine();
					if (userId <= 0) {
						System.out.println("Enter valid User ID (greater than 0)!");
						break;
					}
					System.out.print("Enter User Name : ");
					String userName = sc.nextLine();
					if (userName.trim().isEmpty()) {
						System.out.println("User name cannot be empty!");
						break;
					}
					User user = new User(userId, userName);
					service.addUser(user);
				} catch (Exception e) {
					System.out.println("Invalid input! Please enter a number.");
					sc.nextLine();
					break;
				}

				break;
			case 6:
				System.out.println("\n-------------------");				System.out.println("View All Users");
				service.viewUser();
				break;
			case 7:
				System.out.println("\n-------------------");				System.out.println("Borrow Book");
				System.out.print("Enter Book Id : ");
				try {

					int bid = sc.nextInt();
					sc.nextLine();
					if (bid <= 0) {
						System.out.println("Invalid Book ID!");
						break;
					}
					System.out.print("Enter User Id : ");
					int uId = sc.nextInt();
					sc.nextLine();
					if (uId <= 0) {
						System.out.println("Invalid User ID!");
						break;
					}
					service.borrowBook(bid, uId);
				} catch (Exception e) {
					System.out.println("Invalid input! Please enter a number.");
					sc.nextLine();
					break;
				}
				break;
			case 8:
				System.out.println("\n-------------------");				System.out.println("Return Book");
				System.out.print("Enter Book Id : ");
				try {
					int brid = sc.nextInt();
					sc.nextLine();
					if (brid <= 0) {
						System.out.println("Invalid Book ID!");
						break;
					}
					System.out.print("Enter User Id : ");
					int urId = sc.nextInt();
					sc.nextLine();
					if (urId <= 0) {
						System.out.println("Invalid User ID!");
						break;
					}
					service.returnBook(brid, urId);
				} catch (Exception e) {
					System.out.println("Invalid input! Please enter a number.");
					sc.nextLine();
					break;
				}
				break;

			case 9:
				System.out.println("-------------------");
				System.out.println("User Borrow Book");
				System.out.print("Enter User Id : ");
				try {
					int id = sc.nextInt();
					sc.nextLine();
					if (id <= 0) {
						System.out.println("Invalid User ID!");
						break;
					}
					service.getBookByUser(id);
				} catch (Exception e) {
					System.out.println("Invalid input! Please enter a number.");
					sc.nextLine();
					break;
				}
				break;

			default:
				System.out.println("Invalid Choice!");
			}
		} while (choice != 0);

		System.out.println("Exiting program...");
		sc.close();
	}

}

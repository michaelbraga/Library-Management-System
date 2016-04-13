CREATE TABLE admin (
	admin_id varchar(15) NOT NULL,
	aname varchar(50) NOT NULL,
	apass varchar(20) NOT NULL,
	CONSTRAINT admin_admin_id_pk PRIMARY KEY(admin_id)
);


CREATE TABLE borrower (
	borrower_id varchar(15) NOT NULL,
	bfname varchar(20) NOT NULL,
	bmname varchar(20) NOT NULL,
	blname varchar(20) NOT NULL,
	bpass varchar(20) NOT NULL,
	bcol varchar(60) NOT NULL,

	approved boolean NOT NULL,
	a_id varchar(15),

	borrowertype varchar(7) NOT NULL,
	degcor varchar(50),
	inst varchar(50),

	CONSTRAINT borrower_borrower_id_pk PRIMARY KEY(borrower_id),
	CONSTRAINT borrower_a_id_fk FOREIGN KEY(a_id) REFERENCES admin(admin_id)
);

CREATE TABLE book (
	book_id varchar(15) NOT NULL,
	btitle varchar(50) NOT NULL,
	bpub varchar(50),
	btype varchar(30) NOT NULL,
	a_id varchar(15) NOT NULL,

	bookType varchar(9) NOT NULL,
	bloc varchar(30),
	bdue date,

	CONSTRAINT book_book_id_pk PRIMARY KEY(book_id),
	CONSTRAINT book_a_id_fk FOREIGN KEY(a_id) REFERENCES admin(admin_id)
);

CREATE TABLE book_author (
	b_id varchar(15) NOT NULL,
	authfname varchar(20) NOT NULL,
	authlname varchar(20) NOT NULL,

	CONSTRAINT book_author_key_pk PRIMARY KEY (b_id, authfname, authlname),
	CONSTRAINT book_author_b_id_fk FOREIGN KEY(b_id) REFERENCES book(book_id)
);

CREATE TABLE borrows (
	borrower_id varchar(15) NOT NULL,
	book_id varchar(15) NOT NULL,
	dreq date NOT NULL,
	dborrow date,
	dreturn date,

	approved boolean NOT NULL,
	admin_id varchar(15),

	CONSTRAINT borrows_key_pk PRIMARY KEY(borrower_id, book_id, dreq),
	CONSTRAINT borrows_foreignbor_fk FOREIGN KEY(borrower_id) REFERENCES borrower(borrower_id),
	CONSTRAINT borrows_foreignbok_fk FOREIGN KEY(book_id) REFERENCES book(book_id)
);


INSERT INTO admin(admin_id, aname, apass) values
	('1920212425', 'Adele', '3llo'),
	('pegarao143', 'Pegarao', 'p3gs'),
	('mar_makils', 'Maria Makiling', 'banga'),
	('oble_1234', 'Oble', 'watchmenaenae');

INSERT INTO borrower(borrower_id, bfname, bmname, blname, bpass, bcol, approved, a_id, borrowertype, degcor, inst) values
('1900-12345', 'Emilio', 'Famy', 'Aguinaldo', 'aldub<3', 'College of Arts and Sciences', true, '1920212425', 'teacher', null, 'Institute of Political Science'),
('1900-12346', 'Manuel', 'Luis-Molina', 'Quezon', 'hummus', 'College of Military Science', true, '1920212425', 'teacher', null, 'Institue of Military Science'),
('1900-12347', 'Jose', 'Paciano-Garcia', 'Laurel', 'puppet:(', 'College of Law', true, '1920212425', 'teacher', null, 'Institute of Law and Order'),
('1900-12348', 'Sergio', 'PLH', 'Osmeña', 'Nacionalista!', 'College of Arts and Sciences', true, '1920212425', 'teacher', null, 'Institute of Political Science'),
('1900-12349', 'Manuel', 'Acuña', 'Roxas', 'whyanak', 'College of Arts and Sciences', true, '1920212425', 'teacher', null, 'Institute of Political Science'),
('1900-12350', 'Elpidio', 'Rivera', 'Quirino', 'chineseako', 'College of Arts and Sciences', true, '1920212425', 'teacher', null, 'Institute of Political Science'),
('1900-12351', 'Ramon', 'del Fierro', 'Magsaysay', 'superheartheart', 'College of Arts and Sciences', true, '1920212425', 'teacher', null, 'Institute of Political Science'),
('1900-12352', 'Carlos', 'Polestico', 'Garcia', 'poetdawsiya', 'College of Arts and Sciences', true, 'pegarao143', 'teacher', null, 'Institute of Political Science'),
('1900-12353', 'Diosdado', 'Pangan', 'Macapagal', 'whyanak', 'College of Arts and Sciences', true, 'pegarao143', 'teacher', null, 'Institute of Political Science'),
('1900-12354', 'Ferdinand', 'Edralin', 'Marcos', 'martiallaw', 'College of Arts and Sciences', true, 'pegarao143', 'teacher', null, 'Institute of Political Science'),
('1900-12355', 'Corazon', 'Cojuangco', 'Aquino', 'laban', 'College of Arts and Sciences', true, 'pegarao143', 'teacher', null, 'Institute of Political Science'),
('1900-12356', 'Fidel', 'Valdez', 'Ramos', 'heartheart', 'College of Arts and Sciences', true, 'oble_1234', 'teacher', null, 'Institute of Political Science'),
('1900-12357', 'Joseph', 'Ejercito', 'Estrada', 'juetengpamore', 'College of Arts and Sciences', true, 'oble_1234', 'teacher', null, 'Institute of Political Science'),
('1900-12358', 'Gloria', 'Macapagl', 'Arroyo', 'iamsorry', 'College of Arts and Sciences', true, 'oble_1234', 'teacher', null, 'Institute of Political Science'),
('1900-12359', 'Benigno', 'Cojuangco', 'Aquino', 'tuwidnadaan', 'College of Arts and Sciences', true, 'oble_1234', 'teacher', null, 'Institute of Political Science'),
('2000-12345', 'Miriam', 'Defensor', 'Defensor', 'aralpamore', 'College of Arts and Sciences', false, null, 'student', 'BS Lahat', null),
('2000-12346', 'Rodrigo', 'Roa', 'Duterte', 'pataykapagbadka', 'College of Arts and Sciences', false, null, 'student', 'BS Military', null),
('2000-12347', 'Manuel', 'Araneta', 'Roxas', 'bahalakayo', 'College of Arts and Sciences', false, null, 'student', 'BS Ewan ko sau', null),
('2000-12348', 'Grace', 'Poe', 'Llamanzares', 'tataykosipoe', 'College of Arts and Sciences', false, null, 'student', 'BS Poe', null),
('2000-12349', 'Jejomar', 'Cabauatan', 'Binay', 'nognogpero', 'College of Arts and Sciences', false, null, 'student', 'BS Gusto ko Yan', null);

INSERT INTO book values
('NXHBPV8TRRQRRG', 'To Kill a Mockingbird', 'Pearson', 'Novel', 'mar_makils', 'available', 'Novel Section', null),
('OL0VPIH9P57JHA', '1984', 'ThomsonReuters', 'Novel', 'mar_makils', 'available', 'Novel Section', null),
('S2VUIFYKGRCD4V', 'The Lord of the Rings', 'RELX Group', 'Novel', 'mar_makils', 'available', 'Novel Section', null),
('CZH2F0ATVFFF5P', 'The Catcher in the Rye', 'Wolters Kluwer', 'Novel', 'mar_makils', 'available', 'Novel Section', null),
('6NR9QSZ684Z6HU', 'The Great Gatsby', 'Penguin Random House', 'Novel', 'mar_makils', 'available', 'Novel Section', null),
('L84FY7BVOGXA84', 'The Lion, the Witch and the Wardrobe', 'Hachette Livre', 'Novel', '1920212425', 'available', 'Novel Section', null),
('VNQCHAUG8PMMRD', 'Lord of the Flies', 'De Agostini Editore', 'Novel', '1920212425', 'available', 'Novel Section', null),
('9NYI1UOBF0PS80', 'Animal Farm', 'Oxford University Press', 'Novel', '1920212425', 'available', 'Novel Section', null),
('9JMEZ3UE5NR47A', 'Catch-22', 'Informa', 'Novel', '1920212425', 'available', 'Novel Section', null),
('IELXYBJXM9VLNQ', 'The Grapes of Wrath', 'Shueisha', 'Novel', '1920212425', 'available', 'Novel Section', null);

INSERT INTO book_author values
('NXHBPV8TRRQRRG', 'Harper', 'Lee'),
('OL0VPIH9P57JHA', 'George', 'Orwell'),
('S2VUIFYKGRCD4V', 'J.R.R.', 'Tolkien'),
('CZH2F0ATVFFF5P', 'J.D.', 'Salinger'),
('6NR9QSZ684Z6HU', 'F.Scott', 'Fitzgerald'),
('L84FY7BVOGXA84', 'C.S.', 'Lewis'),
('VNQCHAUG8PMMRD', 'William', 'Golding'),
('9NYI1UOBF0PS80', 'George', 'Orwell'),
('9JMEZ3UE5NR47A', 'Joseph', 'Heller'),
('IELXYBJXM9VLNQ', 'John', 'Steinbeck');

INSERT INTO book values
('9735UCFFDV8W2G', 'Ca-A Cancer Journal for Clinicians', 'Wiley-Blackwell', 'Academic Journal', '1920212425', 'available', 'Thesis Circulation', null),
('SN5LXRFF8H9IMQ', 'Reviews of Modern Physics', 'American Physical Society', 'Academic Journal', '1920212425', 'available', 'Thesis Circulation', null),
('LIYYKSF9J4B8V2', 'Annual Review of Immunology', 'Annual Reviews Inc.', 'Academic Journal', '1920212425', 'available', 'Thesis Circulation', null),
('8UHQ9P5B7G34FZ', 'Cell', 'Cell Press', 'Academic Journal', '1920212425', 'available', 'Thesis Circulation', null),
('17J2977MCDFOW6', 'Annual Review of Astronomy and Astrophysics', 'Annual Reviews Inc.', 'Academic Journal', '1920212425', 'available', 'Thesis Circulation', null),
('6VHOTAW2ZWD4HS', 'Annual Review of Biochemistry', 'Annual Reviews Inc.', 'Academic Journal', '1920212425', 'available', 'Thesis Circulation', null),
('X8ZY5KJ7QA4MWZ', 'Annual Review of Cell and Developmental Biology', 'Annual Reviews Inc.', 'Academic Journal', 'mar_makils', 'available', 'Thesis Circulation', null),
('JUMCT73NKTMXGS', 'Chemical Reviews', 'American Chemical Society', 'Academic Journal', 'mar_makils', 'available', 'Thesis Circulation', null),
('Q8G5IKI7N2LDX3', 'Annual Review of Neuroscience', 'Annual Reviews Inc.', 'Academic Journal', 'mar_makils', 'available', 'Thesis Circulation', null),
('1TVKGUTN5EYZ0A', 'Physiological Reviews', 'American Physiological Society', 'Academic Journal', 'mar_makils', 'available', 'Thesis Circulation', null);

INSERT INTO book values
('E6GUEWV4H0A3BX', 'Sorcery and Cecilia', 'Messagerie', 'Fiction', '1920212425', 'available', 'Filipiniana Section', null),
('GCSB6XLQ9HU9UV', 'Nick and Norah’s Infinite Playlist', 'Media Participations', 'Fiction', '1920212425', 'available', 'Filipiniana Section', null),
('Z01KIGBD5KKU4Q', 'Will Grayson, Will Grayson', 'Mondadori', 'Fiction', '1920212425', 'available', 'Filipiniana Section', null),
('C89PKLBHUQL5VK', 'The Guernsey Literary and Potato Peel Pie Society', 'Cornelsen', 'Fiction', '1920212425', 'available', 'Filipiniana Section', null),
('T9WJRAKLMFHQBA', 'The Fall of the Kings', 'Cambridge University Press', 'Fiction', '1920212425', 'available', 'Filipiniana Section', null),
('L1QP3354F7XNVN', 'A Carrion Death', 'Perseus', 'Fiction', '1920212425', 'available', 'Filipiniana Section', null),
('MYZY2HA7FP52U4', 'Let it Snow', 'Sanoma', 'Fiction', '1920212425', 'available', 'Filipiniana Section', null),
('RC32JXAMF9DBAZ', 'Good Omens', 'Westermann Verlagsgruppe', 'Fiction', '1920212425', 'available', 'Filipiniana Section', null),
('NYCAYWDQMUQJ1U', 'The Halfblood Chronicles', 'Harlequin', 'Fiction', 'mar_makils', 'available', 'Filipiniana Section', null),
('DLIRPZJ3BWG728', 'The Talisman', 'Kyowon', 'Fiction', 'mar_makils', 'available', 'Filipiniana Section', null);

INSERT INTO book_author values
('E6GUEWV4H0A3BX', 'Patricia', 'Wrede'),
('GCSB6XLQ9HU9UV', 'Rachel', 'Cohn'),
('Z01KIGBD5KKU4Q', 'John', 'Green'),
('C89PKLBHUQL5VK', 'Mary Ann', 'Shaffer'),
('T9WJRAKLMFHQBA', 'Ellen', 'Kushner'),
('L1QP3354F7XNVN', 'Michael', 'Sears'),
('MYZY2HA7FP52U4', 'John', 'Green'),
('RC32JXAMF9DBAZ', 'Neil', 'Gaiman'),
('NYCAYWDQMUQJ1U', 'Andre', 'Norton'),
('DLIRPZJ3BWG728', 'Stephen', 'King'),
('E6GUEWV4H0A3BX', 'Caroline', 'Stevermer'),
('GCSB6XLQ9HU9UV', 'David', 'Leviathan'),
('Z01KIGBD5KKU4Q', 'David', 'Leviathan'),
('C89PKLBHUQL5VK', 'Annie', 'Barrows'),
('T9WJRAKLMFHQBA', 'Delia', 'Sherman'),
('L1QP3354F7XNVN', 'Stanley', 'Trollip'),
('MYZY2HA7FP52U4', 'Maureen', 'Johnson'),
('RC32JXAMF9DBAZ', 'Terry', 'Pratchett'),
('NYCAYWDQMUQJ1U', 'Mercedes', 'Lackey'),
('DLIRPZJ3BWG728', 'Peter', 'Straub'),
('MYZY2HA7FP52U4', 'Lauren', 'Myracle');

INSERT INTO borrows values
('1900-12347', 'E6GUEWV4H0A3BX', current_date, null, null, false, null),
('1900-12345', 'GCSB6XLQ9HU9UV', current_date, null, null, false, null),
('1900-12346', 'Z01KIGBD5KKU4Q', current_date, null, null, false, null),
('1900-12355', 'C89PKLBHUQL5VK', current_date, null, null, false, null),
('1900-12348', 'T9WJRAKLMFHQBA', current_date, null, null, false, null),
('1900-12349', 'L1QP3354F7XNVN', current_date, null, null, false, null),
('1900-12350', 'MYZY2HA7FP52U4', current_date, null, null, false, null),
('1900-12351', 'RC32JXAMF9DBAZ', current_date, null, null, false, null),
('1900-12352', 'NYCAYWDQMUQJ1U', current_date, null, null, false, null),
('1900-12353', 'DLIRPZJ3BWG728', current_date, null, null, false, null),
('1900-12354', 'E6GUEWV4H0A3BX', current_date, null, null, false, null);

INSERT INTO borrows values
('1900-12345', 'NXHBPV8TRRQRRG', '2015-11-01', null, null, false, null),
('1900-12347', 'S2VUIFYKGRCD4V', '2015-11-02', null, null, false, null),
('1900-12348', '6NR9QSZ684Z6HU', '2015-11-06', null, null, false, null),
('1900-12350', 'VNQCHAUG8PMMRD', '2015-11-10', null, null, false, null),
('1900-12351', '9JMEZ3UE5NR47A', '2015-11-15', null, null, false, null),
('1900-12353', 'E6GUEWV4H0A3BX', '2015-11-17', null, null, false, null),
('1900-12354', 'Z01KIGBD5KKU4Q', '2015-11-18', null, null, false, null),
('1900-12356', 'T9WJRAKLMFHQBA', '2015-11-19', null, null, false, null),
('1900-12358', 'MYZY2HA7FP52U4', '2015-11-26', null, null, false, null),
('1900-12359', 'NYCAYWDQMUQJ1U', '2015-11-29', null, null, false, null),
('1900-12354', 'E6GUEWV4H0A3BX', '2015-11-10', null, null, false, null);












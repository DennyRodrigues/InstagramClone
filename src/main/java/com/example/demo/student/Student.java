package com.example.demo.student;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

// This annotation is used to mark a class as a JPA (Java Persistence API) entity. JPA is a Java specification for managing, persisting, and accessing data between Java objects and a relational database.
@Entity
// @Table: This annotation is used to specify the details of the table that will be used to persist the entity in the database. If no @Table annotation is provided, JPA assumes that the table name is the same as the entity name.
@Table
public class Student {
    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
            )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long id;
    private String name;
    private String email;
    private LocalDate dov;
    private Integer age;

    public Student(Long id, String name, String email, LocalDate dov) {
        //  Calculate age using the date of birth
        long years = ChronoUnit.YEARS.between(dov, LocalDate.now());
        this.id = id;
        this.name = name;
        this.email = email;
        this.dov = dov;
        this.age = (int) years;
    }
    public Student() {
    }

    public Student(String name, String email, LocalDate dov) {
        //  Calculate age using the date of birth
        long years = ChronoUnit.YEARS.between(dov, LocalDate.now());
        this.name = name;
        this.email = email;
        this.dov = dov;
        this.age = (int) years;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDov() {
        return dov;
    }

    public void setDov(LocalDate dov) {
        this.dov = dov;
    }

    public Integer getAge() {
        return age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", dov=" + dov +
                ", age=" + age +
                '}';
    }
}

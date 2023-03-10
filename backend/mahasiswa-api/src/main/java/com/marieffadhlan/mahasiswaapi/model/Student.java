package com.marieffadhlan.mahasiswaapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document("Student")
public class Student {
    @Id
    private String id;
    @Indexed(unique = true)
    private String nim;
    private String email;
    private String name;
    private Address address;
    private List<String> favouriteSubjects;
    private LocalDateTime created;
    private LocalDateTime updated;

    public Student(String nim,
                   String email,
                   String name,
                   Address address,
                   List<String> favouriteSubjects,
                   LocalDateTime created,
                   LocalDateTime updated
    ) {
        this.nim = nim;
        this.email = email;
        this.name = name;
        this.address = address;
        this.favouriteSubjects = favouriteSubjects;
        this.created = created;
        this.updated = updated;
    }
}

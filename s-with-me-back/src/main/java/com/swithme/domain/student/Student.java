package com.swithme.domain.student;

import com.swithme.domain.Role;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@Builder
@Entity
public class Student implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="studentId")
    private int studentId;

    @Column(name="userId" , unique = true)
    private String userId;

    @Column(name="name")
    private String name;

    @Column(name="password")
    private String password;

    @Column(name="phoneNumber")
    private String phoneNumber;

    @Column(name="birthday")
    private String birthday;

    @Column(name="grade")
    private short grade;
    @Override
    public String getUsername() {
        return userId;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        authorities.add(new SimpleGrantedAuthority(Role.STUDENT.getValue()));

        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Builder
    public Student(int studentId, String userId, String name, String password, String phoneNumber, String birthday, short grade) {
        this.studentId = studentId;
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.grade = grade;
    }

    public void update(String phoneNumber,short grade){
        this.phoneNumber = phoneNumber;
        this.grade = grade;
    }
}

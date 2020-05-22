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
    private int studentId;

    @Column(length = 100, nullable = false, unique = true)
    private String userId;

    @Column(length = 300, nullable = false)
    private String name;

    @Column(length = 300, nullable = false)
    private String password;

    @Column(length = 300, nullable = false)
    private String phoneNumber;

    @Column(length = 300, nullable = false)
    private String birthday;

    @Column(length = 300, nullable = false)
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
    public Student(int studentId, String userId, String name, List<String> roles, String password, String phoneNumber, String birthday, short grade) {
        this.studentId = studentId;
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.grade = grade;
        this.roles = roles;
    }

    public void update(String phoneNumber,short grade){
        this.phoneNumber = phoneNumber;
        this.grade = grade;
    }
}

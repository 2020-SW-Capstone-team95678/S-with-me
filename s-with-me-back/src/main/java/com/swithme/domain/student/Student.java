package com.swithme.domain.student;

import com.swithme.domain.Role;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@Entity(name="student")
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

    @Column(name="isSubscribing")
    private Boolean isSubscribing;

    @Column(name="payDateTime")
    private String payDateTime;

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
    public Student(int studentId, String userId, String name, String password, String phoneNumber,
                   String birthday, short grade, Boolean isSubscribing, String payDateTime) {
        this.studentId = studentId;
        this.userId = userId;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthday = birthday;
        this.grade = grade;
        this.isSubscribing = isSubscribing;
        this.payDateTime = payDateTime;
    }

    public void update(String phoneNumber,short grade){
        this.phoneNumber = phoneNumber;
        this.grade = grade;
    }

    public void update(Boolean isSubscribing, String payDateTime){
        this.isSubscribing = isSubscribing;
        this.payDateTime = payDateTime;
    }

    public void checkSubscription() throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date payDate = simpleDateFormat.parse(this.payDateTime);
        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);

        Long payedDay = now.getTime() - payDate.getTime();
        Long dayToMilliseconds = (24L * 60L * 60L * 1000L);

        //이번 달이 1,2,4,6,8,9,11월이면 저번 달이 31일
        if (calendar.get(Calendar.MONTH) + 1 == 1 ||
                calendar.get(Calendar.MONTH) + 1 == 2 ||
                calendar.get(Calendar.MONTH) + 1 == 4 ||
                calendar.get(Calendar.MONTH) + 1 == 6 ||
                calendar.get(Calendar.MONTH) + 1 == 8 ||
                calendar.get(Calendar.MONTH) + 1 == 9 ||
                calendar.get(Calendar.MONTH) + 1 == 11) {
            if (payedDay > (31 * dayToMilliseconds) ) {
                this.isSubscribing = false;
            }
            //이번 달이 5,7,10,12월이면 저번 달이 30일
        } else if (calendar.get(Calendar.MONTH) + 1 == 5 ||
                calendar.get(Calendar.MONTH) + 1 == 7 ||
                calendar.get(Calendar.MONTH) + 1 == 10 ||
                calendar.get(Calendar.MONTH) + 1 == 12) {
            if (payedDay > (30 * dayToMilliseconds)) {
                this.isSubscribing = false;
            }
        }
        //이번 달이 3월이면 저번 달이 28일
       else{
            if(payedDay > (28 * dayToMilliseconds)){
                this.isSubscribing = false;
            }
        }
    }
}

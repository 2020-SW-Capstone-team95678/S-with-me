package com.swithme.domain.problem;

import com.swithme.domain.subChapter.SubChapter;
import com.swithme.web.dto.ProblemUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.engine.jdbc.ClobProxy;

import javax.persistence.*;
import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;

@Getter
@NoArgsConstructor
@Entity(name = "problem")
public class Problem{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "problemId")
    private int problemId;

    @ManyToOne
    @JoinColumn(name = "subChapterId")
    private SubChapter subChapter;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "content")
    private Clob content;

    @Lob
    @Column(name = "solution")
    private Clob solution;

    @Column(name = "problemNumber")
    private Short problemNumber;

    @Column(name = "answer")
    private String answer;

    @Lob
    @Column(name = "image")
    private Clob image;

    @Column(name = "isOptional")
    private Boolean isOptional;

    @Column(name = "option1")
    private String option1;

    @Column(name = "option2")
    private String option2;

    @Column(name = "option3")
    private String option3;

    @Column(name = "option4")
    private String option4;

    @Column(name = "option5")
    private String option5;

    @Column(name = "isMath")
    private Boolean isMath;

    @Builder
    public Problem(SubChapter subChapter, String title, Clob content, Clob solution,
                    short problemNumber, Clob image, String answer, Boolean isOptional,
                   String option1, String option2, String option3, String option4, String option5,
                   Boolean isMath){
        this.subChapter = subChapter;
        this.title = title;
        this.content = content;
        this.solution = solution;
        this.problemNumber = problemNumber;
        this.image = image;
        this.answer = answer;
        this.isOptional = isOptional;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.option5 = option5;
        this.isMath = isMath;
    }

    public void update(SubChapter subChapter, ProblemUpdateRequestDto requestDto) {
        this.subChapter = subChapter;
        this.title = requestDto.getTitle();

        try{ this.content = ClobProxy.generateProxy(requestDto.getContent()); }
        catch (NullPointerException nullPointerException){ this.content = null; }

        try{ this.solution = ClobProxy.generateProxy(requestDto.getSolution()); }
        catch (NullPointerException nullPointerException){ this.solution = null; }

        try{ this.image = ClobProxy.generateProxy(requestDto.getImage()); }
        catch (NullPointerException nullPointerException){ this.image = null; }

        this.problemNumber = requestDto.getProblemNumber();
        this.answer = requestDto.getAnswer();
        this.isOptional = requestDto.getIsOptional();
        this.option1 = requestDto.getOption1();
        this.option2 = requestDto.getOption2();
        this.option3 = requestDto.getOption3();
        this.option4 = requestDto.getOption4();
        this.option5 = requestDto.getOption5();
    }

    public static String readClobData(Reader reader) throws IOException{
        StringBuffer stringBuffer = new StringBuffer();
        char[] buffer = new char[1024];
        if(reader != null){
            int length = 0;
            while((length = reader.read(buffer)) != -1)
                stringBuffer.append(buffer, 0, length);
        }
        return stringBuffer.toString();
    }
}

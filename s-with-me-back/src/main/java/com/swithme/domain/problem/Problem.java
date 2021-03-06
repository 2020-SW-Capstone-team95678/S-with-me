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
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity(name = "problem")
public class Problem implements Comparable<Problem>{

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

    @Column(name = "beforeProblemId")
    private Integer beforeProblemId;

    @Builder
    public Problem(SubChapter subChapter, String title, String content, String solution,
                    short problemNumber, String image, String answer, Boolean isOptional,
                   String option1, String option2, String option3, String option4, String option5,
                   Boolean isMath, Integer beforeProblemId){
        this.subChapter = subChapter;
        this.title = title;
        this.problemNumber = problemNumber;

        try{ this.content = ClobProxy.generateProxy(content); }
        catch (NullPointerException nullPointerException){ this.content = null; }

        try{ this.solution = ClobProxy.generateProxy(solution); }
        catch (NullPointerException nullPointerException){ this.solution = null; }

        try{ this.image = ClobProxy.generateProxy(image); }
        catch (NullPointerException nullPointerException){ this.image = null; }

        this.answer = answer;
        this.isOptional = isOptional;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.option5 = option5;
        this.isMath = isMath;
        this.beforeProblemId = beforeProblemId;
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

    public void update(Integer beforeProblemId){
        this.beforeProblemId = beforeProblemId;
    }

    public String getContent() throws SQLException {
        String content;
        try{ content = readClobData(this.content.getCharacterStream()); }
        catch (NullPointerException | IOException exception){ content = null; }
        return content;
    }

    public String getImage() throws SQLException {
        String image;
        try{ image = readClobData(this.image.getCharacterStream()); }
        catch (NullPointerException | IOException exception){ image = null; }
        return image;
    }
    public String getSolution() throws SQLException {
        String solution;
        try{ solution = readClobData(this.solution.getCharacterStream()); }
        catch (NullPointerException | IOException exception){ solution = null; }
        return solution;
    }

    @Override
    public int compareTo(Problem problem){
        if(problem.getBeforeProblemId() == this.getProblemId())
            return -1;
        else if(this.getBeforeProblemId() == problem.getProblemId())
            return 1;
        else
            return 0;
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

    public static List<Problem> paginate(List<Problem> problemList, short lastPageNumber){
        List<Problem> problemListInPage;
        try{
            problemListInPage = problemList.subList(lastPageNumber * 8 - 8, lastPageNumber * 8);
        } catch(IndexOutOfBoundsException indexOutOfBoundsException){
            //subChapter의 마지막 페이지의 경우 문제가 8문제가 아닐 수도 있음.
            problemListInPage = problemList.subList(lastPageNumber * 8 - 8, problemList.size());
        }
        return problemListInPage;
    }
}

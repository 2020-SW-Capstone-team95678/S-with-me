package com.swithme.domain.myProblem;

import com.swithme.domain.myBook.MyBook;
import com.swithme.domain.problem.Problem;
import com.swithme.web.dto.MyProblemUpdateRequestDto;
import com.swithme.web.dto.NoteUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.engine.jdbc.ClobProxy;


import javax.persistence.*;
import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;
import java.sql.SQLException;

@Getter
@NoArgsConstructor
@Entity(name = "myProblem")
public class MyProblem implements Comparable<MyProblem>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "myProblemId")
    private int myProblemId;

    @OneToOne
    @JoinColumn(name = "myBookId")
    private MyBook myBook;

    @OneToOne
    @JoinColumn(name = "problemId")
    private Problem problem;

    @Column(name = "linkSolutionId")
    private Integer linkSolutionId;

    @Lob
    @Column(name = "imageSolution")
    private Clob imageSolution;

    @Lob
    @Column(name = "textSolution")
    private Clob textSolution;

    @Lob
    @Column(name = "handSolution")
    private Clob handSolution;

    @Column(name = "solutionType")
    private String solutionType;

    @Column(name = "isConfused")
    private Boolean isConfused;

    @Column(name = "isRight")
    private Boolean isRight;

    @Column(name = "solvedDateTime")
    private Long solvedDateTime;

    @Column(name = "myAnswer")
    private String myAnswer;

    @Column(name = "isSolved")
    private Boolean isSolved;

    @Column(name = "isMath")
    private Boolean isMath;

    @Builder
    public MyProblem(MyBook myBook, Problem problem, Integer linkSolutionId,
                     Clob imageSolution, Clob textSolution, Clob handSolution, String solutionType,
                     Boolean isConfused, Boolean isRight, Long solvedDateTime, String myAnswer, Boolean isSolved,
                     Boolean isMath) {
        this.myBook = myBook;
        this.problem = problem;
        this.linkSolutionId = linkSolutionId;
        this.imageSolution = imageSolution;
        this.textSolution = textSolution;
        this.handSolution = handSolution;
        this.solutionType = solutionType;
        this.isConfused = isConfused;
        this.isRight = isRight;
        this.solvedDateTime = solvedDateTime;
        this.myAnswer = myAnswer;
        this.isSolved = isSolved;
        this.isMath = isMath;
    }
    @Override
    public int compareTo(MyProblem myProblem){
        if(myProblem.getProblem().getBeforeProblemId() == this.getProblem().getProblemId())
            return -1;
        else if(this.getProblem().getBeforeProblemId() == myProblem.getProblem().getProblemId())
            return 1;
        else
            return 0;
    }

    public void update(MyProblemUpdateRequestDto requestDto) {
        this.linkSolutionId = requestDto.getLinkSolutionId();

        try{ this.imageSolution = ClobProxy.generateProxy(requestDto.getImageSolution()); }
        catch (NullPointerException nullPointerException){ this.imageSolution = null; }

        try{ this.textSolution = ClobProxy.generateProxy(requestDto.getTextSolution()); }
        catch (NullPointerException nullPointerException){ this.textSolution = null; }

        try{ this.handSolution = ClobProxy.generateProxy(requestDto.getHandSolution()); }
        catch (NullPointerException nullPointerException){ this.handSolution = null; }

        this.solutionType = requestDto.getSolutionType();
        this.isConfused = requestDto.getIsConfused();
        this.isRight = requestDto.getIsRight();
        this.solvedDateTime = requestDto.getSolvedDateTime();
        this.myAnswer = requestDto.getMyAnswer();
        this.isSolved = requestDto.getIsSolved();
    }

    public void update(NoteUpdateRequestDto requestDto) {
        this.solvedDateTime = requestDto.getSolvedDateTime();
        this.isRight = requestDto.getIsRight();
        this.myAnswer = requestDto.getMyAnswer();
        this.linkSolutionId = requestDto.getLinkSolutionId();

        try{ this.imageSolution = ClobProxy.generateProxy(requestDto.getImageSolution()); }
        catch (NullPointerException nullPointerException){ this.imageSolution = null; }

        try{ this.textSolution = ClobProxy.generateProxy(requestDto.getTextSolution()); }
        catch (NullPointerException nullPointerException){ this.textSolution = null; }

        try{ this.handSolution = ClobProxy.generateProxy(requestDto.getHandSolution()); }
        catch (NullPointerException nullPointerException){ this.handSolution = null; }

        this.solutionType = requestDto.getSolutionType();
    }

    public String getImageSolution() throws SQLException {
        String imageSolution;
        try{ imageSolution = readClobData(this.imageSolution.getCharacterStream()); }
        catch (NullPointerException | IOException exception){ imageSolution = null; }
        return imageSolution;
    }

    public String getTextSolution() throws  SQLException {
        String textSolution;
        try{ textSolution = readClobData(this.textSolution.getCharacterStream()); }
        catch (NullPointerException | IOException exception){ textSolution = null; }
        return textSolution;
    }

    public String getHandSolution() throws SQLException {
        String handSolution;
        try{ handSolution = readClobData(this.handSolution.getCharacterStream()); }
        catch (NullPointerException | IOException exception){ handSolution = null; }
        return handSolution;
    }

    public static String readClobData(Reader reader) throws IOException {
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

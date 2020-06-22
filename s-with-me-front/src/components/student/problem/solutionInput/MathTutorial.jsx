import React from 'react';
import { Modal, List } from 'semantic-ui-react';
import Heading from '../../../../common-ui/Heading';

import { delimeters } from '../../../../constants/delimeters';

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function MathTutorial() {
  return (
    <Modal.Content scrolling>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Heading level={4}>아주 간단한 수식 입력 방법</Heading>
      </div>
      <Modal.Description>
        <List celled ordered>
          <List.Item>
            기본적인 수식 입력 방법
            <List.List>
              <List.Item>수식을 포함하지 않은 텍스트는 그냥 입력하세요</List.Item>
              <List.Item>
                수식을 포함한 텍스트는 '$'로 감싸주세요. <br />
                ex) <Latex delimiters={delimeters}>$x$</Latex> == $x$
              </List.Item>
              <List.Item>
                수식을 가운데로 정렬하려면 '$$'로 감싸주세요. <br />
                ex) $$f(x)=x+2$$
                <Latex delimiters={delimeters}>$$f(x)=x+2$$</Latex>
              </List.Item>
              <List.Item>수식 안의 수식은 &#123; &#125; 로 감싸주세요</List.Item>
            </List.List>
          </List.Item>
          <List.Item>
            지수, 로그
            <List.List>
              <List.Item>
                지수 : $밑^지수부분$으로 입력합니다. <br />
                ex) <Latex delimiters={delimeters}>$2^3$</Latex> == $2^3$
              </List.Item>
              <List.Item>
                로그 : $\log_&#123;밑&#125; &#123;진수&#125;$로 입력합니다. <br />
                ex) <Latex delimiters={delimeters}>$\log_&#123;2&#125;&#123;3&#125;$</Latex>
                == $\log_&#123;2&#125;&#123;3&#125;$
              </List.Item>
            </List.List>
          </List.Item>
          <List.Item>
            루트, 분수
            <List.List>
              <List.Item>
                루트 : $\sqrt&#123;제곱근&#125;$으로 입력합니다. <br />
                ex) <Latex delimiters={delimeters}>$\sqrt&#123;2&#125;$</Latex>
                == $\sqrt&#123;2&#125;$
              </List.Item>
              <List.Item>
                분수 : $&#123;분모&#125;\over&#123;분자&#125;$로 입력합니다. <br />
                ex) <Latex delimiters={delimeters}>$&#123;1&#125;\over&#123;2&#125;$</Latex>
                == $&#123;1&#125;\over&#123;2&#125;$
              </List.Item>
            </List.List>
          </List.Item>
          <List.Item>
            그리스 문자
            <List.Item>
              $\문자 철자$으로 입력합니다. <br />
            </List.Item>
            <List.List>
              <List.Item>
                ex) <Latex delimiters={delimeters}>$\alpha$</Latex> == $\alpha$
              </List.Item>
              <List.Item>
                ex) <Latex delimiters={delimeters}>$\pi$</Latex> == $\pi$
              </List.Item>
            </List.List>
          </List.Item>
          <List.Item>
            삼각함수
            <List.List>
              <List.Item>
                ex) <Latex delimiters={delimeters}>$\sin&#123;\theta&#125;$</Latex> ==
                $\sin&#123;\theta&#125;$
              </List.Item>
              <List.Item>
                ex) <Latex delimiters={delimeters}>$\cos&#123;\theta&#125;$</Latex> ==
                $\cos&#123;\theta&#125;$
              </List.Item>
              <List.Item>
                ex) <Latex delimiters={delimeters}>$\tan&#123;\theta&#125;$</Latex> ==
                $\tan&#123;\theta&#125;$
              </List.Item>
            </List.List>
          </List.Item>
        </List>
      </Modal.Description>
    </Modal.Content>
  );
}

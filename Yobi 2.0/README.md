# 요비 마크업 작업자 인수인계

## Tool
### esLint

jsx와 css파일 작업중 문법이 틀리면 틀린 위치와 이유를 알려주는 기능을 하는 플러그인으로 에디터내에 install package로 설치를 권장한다.

### react developer tools

Chrome 확장도구에서 React Developer Tools를 설치하면 개발자도구 사용 시에 react 탭이 활성화되는데 눌러보면 일반 html형식의 DOM트리가 아닌 컴포넌트 DOM트리 형식으로 볼 수 있게 된다. 따라서 작업해야 할 컴포넌트를 찾을 때 편리하다.

## JSX

### 문법

jsx 파일은 자바스크립트 내부에 html문법을 사용한 마크업이 들어가 있는 파일로, 오직 1개의 컴포넌트만 생성할 수 있고, 상단에 import를 통해 다른 컴포넌트를 불러와서 생성한 현재 컴포넌트 안에서 사용 할 수 있다.
마크업 작업자는 render라는 함수 안에 return문에 마크업을 하면 되는데(render 함수의 return문 내의 마크업이 화면에 렌더링된다. 그러나 이 안에서 또 함수를 호출해서 쓰는데 그 함수는 render함수 위에 선언해져있고 그 선언된 함수 내에도 마크업이 있으니 엄밀히 말하면 함수의 return문 내의 마크업에 작업한다고 보면 맞을 것이다.), 주의할 사항은 return 되는 태그가 div던지, p던지, span이던 간에 부모태그는 하나여야 한다.
(※ 태그 대신 컴포넌트가 return 될 수 도있다. 그 return 되는 컴포넌트도 결국은 하나의 부모태그로 이루어져 있을 것이기 때문에 결국 결과는 같다.)
그 후에는 자유롭게 자식태그를 추가해도 된다. 혹시나 자식태그가 없는 경우 닫는 태그없이 /만 사용해 닫는다.
예를 들면 아래와 같다.

    //오류
    render() {
        return (
            <div>{'title'}</div>
            <div>{'content'}</div>
        );
    }

    //정상
    render() {
        return (
            <div>
                <div>{'title'}</div>
                <div>{'content'}</div>
            </div>
        );
    }

    //children이 없을 때
    render() {
        return (
            <div />
        );
    }

    //태그가 아닌 component
    render() {
        return (
            <Tooltip>
                <button type={'button'}>
            </Tooltip>
        );
    }

또 태그 혹은 컴포넌트에 속성이 2개이상 작성하는 경우 속성은 개행해서 작성하고 닫는 괄호도(/포함) 개행해서 작성한다. 물론 들여쓰기는 정확해야 문법오류가 나지 않는다.

    //개행
    render() {
        return (
            <div>
                <input
                    className={css.inputBox}
                    id={'input'}
                    type={'text'}
                    name={'blabla'}
                    title={'blabla'}
                    placeholder={'blabla'}
                />
            </div>
        );
    }
    
       
### class

class를 사용하려면 jsx파일 상단에 아래 예처럼 css파일 import를 선언해야하는데, 경로를 지정 할 때 현재위치는 생략가능했던 HTML과 다르게 ./을 필수로 작성해줘야한다. 상위는 똑같이 ../ 이런식으로 작성해준다.

    import css from './css/TestComponent.css';
    ...


    class TestComponent extends Component {
        render() {
            return (
                <p className={css.testComponent}>
        	       {children}
                </p>
             );
         }
    }

class를 부여할 때는 local class와 global class를 줄 수 있는데 local class를 부여하되, 상황에 따라서는 global class를 주면 된다.
문법은 className 속성을 사용해 class를 선언하면 되는데 local class는 className={css.클래스명}, global class는 className='클래스명' 방식으로 작성한다.

react는 독립적인 컴포넌트간의 조합으로 이루어져있기 때문에 기본적으로 local class를 주어서 해당 컴포넌트에서만 사용할 목적으로 css를 작성하면 된다. (어차피 local class를 주게되면 해당 컴포넌트가 아닌 다른 컴포넌트에서 해당 컴포넌트를 불러와도 class에는 접근할 수 없다. 하지만 반대로 globall class를 주게되면 다른 컴포넌트에서 해당 컴포넌트의 class를 접근해서 css를 수정할 수 있기 때문에 자칫하면 해당 컴포넌트의 스타일이 망가질 수 있다. 따라서 globall class를 쓸 때는 신중해야 하며 보통 공통컴포넌트나 layout관련된 컴포넌트에 사용되고 있다.)
사용예는 아래와 같다.

    // local class
    render() {
       return (
         <div className={css.localClass}>
           {'localClass라는 local class부여'}
         </div>
       );
    }

    // global class
    render() {
       return (
         <div className='globalClass'>
           {'globalClass라는 global class 부여'}
         </div>
       );
    }

중첩 클래스를 주고자 할 때에는 상단에 classNames 플러그인을 import 선언해주고, 반드시 중첩클래스를 사용해야 한다. 그렇지 않으면 에러가 발생한다. classNames 는 문법이 조금 까다로운데 기본적인 중첩클래스 선언과 boolean값, 조건 값 등 스크립트 코드와 같이 선언될 때가 있다.

    import css from './css/TestComponent.css';
    import classNames from 'classnames';
    ...

    // 일반적인 중첩 클래스
    class TestComponent extends Component {
        render() {
            return (
                <p
                    className={classNames(
                        css.testComponent,
                        css.nestedClass
                    )}
                >
                    {'문단내용문단내용'}
                </p>
            );
        }
    }

    // toggle 중첩 클래스(조건에 따라 클래스가 붙거나 안붙어야 할 때)
    class TestComponent extends Component {
        render() {
            return (
                <p
                    className={classNames({
                        [css.testComponent]: true,
                        [css.on]: true,
                        [css.hide]: false
                    })}
                >
                    {/* '[D] 활성화 시 css.on 값을 true로 넣어주세요' */}
                    {'문단내용 123'}
                </p>
            );
        }
    }

위 예를 보면 밑에 toggle 클래스를 사용 한 경우에는 클래스명을 대괄호로 묶고 또 한번 중괄호로 묶어주는 것을 볼 수 있다. 클래스명에는 bool값을 주어 true일땐 적용이 되고, false일 때는 적용이 안되는 걸로 생각하면 된다.

on이나 active 같은 toggle class가 필요한 작업에는 중첩 클래스로 부여한뒤 boolean 값(true,false)을 통해 작업 시 쉽게 확인 할 수 있다. 작업이 완료가 되면 주석으로 toggle class가 붙는 조건 등을 기술해 놓거나 메신저로 직접 개발자와 커뮤니케이션하면 된다.

### 데이터 값 및 주석

데이터는

    {'abcdefg'}, {'1234567890'}, {'데이터'}

식으로 작성하고, 주석은

    {/* 'abcdefg' */}, {/* '1234567890' */}, {/* '데이터' */}
식으로 작성한다.

## CSS

css파일명은 기본적으로 컴포넌트명(=파일명)과 동일하게 짓는데, 굳이 A.jsx = A.css, B.jsx = B.css 처럼 1:1 비율일 필요는 없다.
A.jsx = A.css, B.jsx = A.css 비슷한 컴포넌트들이 하나의 css를 참조하는 경우도 있다. 그러나 보통은 1:1비율로 작성하는 것을 권장한다.
css작성할 때는 local CSS 와 global CSS 를 구분해서 작성하도록..

### local CSS

기본적으로 컴포넌트는 각각 독립적인 css스타일을 가지며, 가령 A컴포넌트의 css가 B컴포넌트의 스타일에 영향을 주면 안된다.
local scope문법을 사용해서 해당css를 참조하는 컴포넌트내에서만 적용되도록 작성한다.
아래는 그 예이다.

    :local(.myComponent) {
        display: block;
        background: red;
    }

    :local(.myComponent .button.hide) {
        display: none;
    }
    
 ### global CSS

global class를 선언한 class만 global scope문법 안에 넣어서 사용할 수 있다. global class를 선언했다는 뜻은 기본적으로 공통컴포넌트로 가져가되, 상황에 따라 다른 컴포넌트에서 스타일을 변경해서 쓰겠다는 뜻으로 볼 수 있다. 실례로 select box 컴포넌트는 css가 전부 global로 선언되어있다.
그래서 기본적으로는 모든페이지에서 공통적으로 보이지만 특정 컴포넌트 내에서는 스타일을 조금씩 변형해서 쓰는 편이다.
또는 global class를 selector로 이용해 특정 컴포넌트를 수정하는 방법도 있다.(이 경우 보통 layout과 관련돼 선언된 global class를 selector로 잡는다.) 아래는 그 예이다.

    /* 공통 컴포넌트 css */
    :global(.select) {
        background: blue;
    }

    /* 현재 컴포넌트에서만 공통 컴포넌트를 수정 */
    :local(.myComponent) :global(.select) {
        background: red;
    }

    /* global class를 가지고있는 컴포넌트 내에서만 현재 컴포넌트를 수정 /*
    :global(.contentBox) :local(.myComponent) {
        font-size: 10px;
    }

    /* local class와 global class가 중첩일 경우 공백을 없앤다.*/
    :global(.contentBox):local(.postForm) {
        border: 1px solid red;
    }
    
  ## 컴포넌트
  
  마크업 경로는 곧 컴포넌트의 위치로 yobi-client/src/plugins/컴포넌트그룹명/src/components/인데, 컴포넌트그룹폴더 하위에 각각의 컴포넌트가 존재하고 컴포넌트가 동작하기 위한 package.json파일, jsx파일, js파일, css파일, image파일 등이 있다.
  
  ### 컴포넌트 불러오기

작업을 하다보면 기존에 있는 컴포넌트가 필요할 때가 있다. 그럼 현재 작업중인 컴포넌트에서 불러와야 하는데 컴포넌트를 불러오려면 jsx파일 상단에 css와 같은 방식으로 import를 하고 경로를 작성한다. 그 후 마크업 하는 부분에 태그처럼 <컴포넌트명>...</컴포넌트명>으로 작성하되, children요소는 불러오려는 컴포넌트 내부에 있기 때문에 불러온 컴포넌트에서는 children 요소를 가지는 경우는 대부분 없다. 그래서 보통 <컴포넌트명 />으로 작성한다. (참고로 Tooltip 컴포넌트 같은 경우는 children 요소를 필요로 하기 때문에 기본문법으로 작성한다.)

크게 현재 컴포넌트가 속한 컴포넌트그룹을 기준으로 현재 컴포넌트 그룹에 속한 다른 컴포넌트를 불러오려면 내부 컴포넌트 불러오기, 다른 컴포넌트 그룹에 속한 컴포넌트를 불러오려면 외부 컴포넌트 불러오기 방법이 있다.

#### 내부 컴포넌트 불러오기
내부 컴포넌트 불러오는 방법은 간단한 편이다. 위에 언급했듯이 불러오려는 컴포넌트의 이름과 경로를 import구문으로 작성 후 <컴포넌트명>...</컴포넌트명>으로 불러온다.


    import MyComponent from './MyComponent';
    ...

    //내부 컴포넌트 불러오기
    render() {
        return (
            <div>
                <MyComponent />
            </div>
        );
    }

#### 외부 컴포넌트 불러오기
외부 컴포넌트를 불러오려면 우선 불러오려는 컴포넌트그룹폴더로 가서index.js(src폴더와 같은 위치)를 열고 import에는 해당컴포넌트명과 경로를, export에는 해당 컴포넌트명을 아래처럼 작성한뒤 저장을 해준다.(이미 되어있다면 패스한다.)


    ...
    import MyComponent from './src/components/MyComponent.jsx';


    export {
        ...,
        MyComponent
    };

그후 기본적으로 내부 컴포넌트 불러올 때 처럼 작성하되, 컴포넌트명을 중괄호로 감싸준 후 경로는 불러오려는 컴포넌트가 있는 컴포넌트그룹폴더명만 작성해주면 된다.
(컴포넌트그룹폴더명이 같은 두 개의 컴포넌트를 import할 경우 한 줄로 통합하고 컴포넌트명 부분을 ,로 구분해서 이어 작성하면 된다.)

    import {MyComponent} from 'com.navercorp.yobi.components';
    import {testComponent, otherComponent} from 'com.navercorp.yobi.main';
    ...

    //외부 컴포넌트 불러오기
    render() {
        return (
            <div>
                <MyComponent />
                <testComponent
                    properties={value}
                    isHide={hide}
                />
                    {'blabla...'}
                <otherComponent
                    post={post}
                    name={message}
                />
            </div>
        );
    }

### 컴포넌트화

해야 할 작업이 간단한 css작업이라면 필요없겠지만 새로운 UI가 추가될 때는 마크업 작업이 필요한데, 이 때 추가될 UI가 컴포넌트화가 필요할 정도라고 판단이 되면 컴포넌트화를 하고 마크업을 진행하면 된다. (사실 굳이 컴포넌트화를 하지 않고 마크업만 해도 어차피 개발작업을 할 때 보통 컴포넌트화를 하기때문에 필수는 아니다. 그래도 필자는 컴포넌트화를 하는편이지만 알고있어서 나쁠 것은 없을 듯 하다.)
컴포넌트화 작업을 할 땐 그룹핑을 잘 고려해서 컴포넌트 성격에 맞는 컴포넌트그룹폴더에 추가해야한다.

아래는 컴포넌트가 되기 위한 최소한의 구문이다. class 컴포넌트명과 최하단 export default 컴포넌트명과 jsx파일명이 일치해야 한다.

    import React, {Component} from 'react';

    class MyComponent extends Component {
        render() {
            return (
                <div>
                    {'hello world!'}
                </div>
            );
        }
    }

    export default MyComponent;

### 컴포넌트의 클래스

A컴포넌트의 스타일을 유지한채 B컴포넌트에서만 A컴포넌트의 스타일을 수정해야 하는 경우가 있다. 알아둬야 할 점은 기본적으로 A컴포넌트의 내부에선 클래스를 주고 스타일을 지정할 순 있어도, 다른 B컴포넌트에서 A컴포넌트를 불러온 뒤 클래스를 주면 동작하지 않는다. 그렇다고 A컴포넌트의 css를 수정했다가는 A컴포넌트를 쓰고있는 다른 많은 컴포넌트에서도 같이 적용되기 때문에 함부로 수정할 수 없을 것이다. A컴포넌트의 css를 건들지 않고, 수정할 수 있는 방법을 무엇일까.
global class 를 이용하면 쉽게 수정할 수 있다. A컴포넌트에 global class를 선언하고 B컴포넌트에서만 A컴포넌트의 global class를 selector로 잡고 수정하면 된다. 그러나 global class는 위에도 언급했듯이 제한적으로 써야하기 때문에 global class 대신 B컴포넌트에서 A컴포넌트에도 클래스를 지정해서 접근할 수 있는 방법을 소개한다.

render 함수 위에 const props = this.props; 와 같이 props를 상수로 선언한다. 그 후 아래 클래스 선언 할 곳에 className={css.클래스명} 대신 className={props.className} 을 적어주면 B컴포넌트에서도 A컴포넌트에 클래스를 선언해서 스타일을 수정할 수 있다.

    // A.jsx
    import css from './css/A.css';
    import React, {Component} from 'react';
    ...

    class A extends Component {
    
        const props = this.props;
	
        render() {
            return (
                <div className={props.className}>
                    {'hello world!'}
                </div>
            );
        }
    }

    export default A;


    // B.jsx
    import css from './css/B.css';
    import A from './A.jsx';
    import React, {Component} from 'react';

    class B extends Component {

        render() {
            return (
                <div>
                    <A className={css.availableClass} />
                </div>
            );
        }
    }

    export default B;
    
### 작업 시 컴포넌트 찾기

실제로 작업을 하려면 작업할 부분이 어느 파일인지(컴포넌트인지) 찾기가 힘들 것 이다. 그러나 위 Setting에서 설명한 React Developer Tools를 설치한다면 쉽게 찾을 수 있다. 개발자도구를 열어 inspector로 찾고자 하는 곳을 선택하고 개발자도구 상단 탭메뉴에 React 탭을 클릭해보면 React DOM 구조를 확인할 수 있는데 inspector가 가리키는 곳의 컴포넌트가 선택되어있을 것이다. 해당 컴포넌트명으로 에디터에서 jsx파일을 검색 및 연 후에 작업을 진행하면 된다. 컴포넌트명이 아닌 html태그라면 조금 더 상위 구조로 올라가서 컴포넌트명이 나올 때 까지 찾은 후 똑같이 진행하면 된다.

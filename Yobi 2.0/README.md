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

 - **내부 컴포넌트 불러오기**
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

 - **외부 컴포넌트 불러오기**
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


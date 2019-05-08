// DATA는 이미 작성된 트윗을 표시합니다.
console.log(DATA)

// generateNewTweet을 호출할 때마다 새로운 트윗을 생성합니다.
console.log(generateNewTweet());

let ul = document.querySelector('.content .list_comments'),
	writer = document.getElementById('title_selected_writer'),
	createdAtData = [],
	createdAtDataOnSorting = [],
	selectedWriter, clearID, originUL,
	DATA2 = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')) : [],
	viewPopupButton = '<i class="material-icons">visibility</i>';


//sessionStorage 저장
sessionStorage.setItem('data', JSON.stringify(DATA2));
const localData = JSON.parse(sessionStorage.getItem('data'));

//DATA를 작성된 날짜 순으로 정렬
DATA = DATA.sort(function(a, b) {
	if (a.created_at > b.created_at) {
		return -1;
	} else if (b.created_at < a.created_at) {
		return 1;
	}

	return 0;
});

function checkSameYear(createdAt) {
	let nowYear = new Date().getFullYear();
	let createdYear = Number(createdAt.slice(0, 4));

	if (nowYear === createdYear) {
		createdAt = createdAt.slice(5);

		return createdAt;
	}

	return createdAt;
}

//이미 작성되어있는 트윗 보여주기
for (let i = 0; i < DATA.length; i++) {
	createdAtData.push(checkSameYear(DATA[i].created_at));
	ul.appendChild(document.createElement('li'));
	ul.childNodes[i].className = 'comment';
		
	ul.childNodes[i].appendChild(document.createElement('div')).textContent = DATA[i].message;
	ul.childNodes[i].appendChild(document.createElement('div')).textContent = DATA[i].user;
	ul.childNodes[i].childNodes[1].className = 'sorting';
	ul.childNodes[i].appendChild(document.createElement('div')).innerHTML = checkSameYear(DATA[i].created_at);
	ul.childNodes[i].appendChild(document.createElement('div')).innerHTML = viewPopupButton;
}

// 로컬스토리지에 저장된 트윗 보여주기
if (localData.length) {
	for(let i = 0; i < localData.length; i++) {
		createdAtData.unshift(localData[i].created_at);
		localTweetDataPrint(localData[i]);
		realTimeTimeDiff();
	}
}

function localTweetDataPrint(obj) {
	let li = document.createElement('li');
	
	ul.prepend(li);
	li.className = 'comment';

	li.appendChild(document.createElement('div')).textContent = obj.message;
	li.appendChild(document.createElement('div')).textContent = obj.user;
	li.appendChild(document.createElement('div')).textContent = obj.created_at;
	li.childNodes[1].className = 'sorting';
	li.appendChild(document.createElement('div')).innerHTML = viewPopupButton;
}

//입력한 새로운 트윗 등록
function submitNewTweet() {
	let tweetContent = document.getElementById('input_tweet').value;
	let li = document.createElement('li');
	let writeTime = checkSameYear(new Date().format());
	let myID = 'myID';
	let tweetData = {};
	
	tweetData.user = myID;
	tweetData.message = tweetContent;
	tweetData.created_at = writeTime;
	
	DATA2.push(tweetData);
	sessionStorage.setItem('data', JSON.stringify(DATA2));
	
	if (!tweetContent.length) {
		alert('Please input an one letter at least');

		return false;
	} else if (tweetContent[0] === ' ') {
		for (var i = 0; i < tweetContent.length; i++) {
			if (tweetContent[i] !== ' ') break;
		}

		if (i >= tweetContent.length) {
			alert('Please input an one letter at least');

			return false;
		}
	}

	ul.prepend(li);
	li.className = 'comment';
	
	li.appendChild(document.createElement('div')).textContent = tweetContent;
	li.appendChild(document.createElement('div')).textContent = myID;
	li.childNodes[1].className = 'sorting';
	li.appendChild(document.createElement('div')).innerHTML = timeDiff(writeTime);
	li.appendChild(document.createElement('div')).innerHTML = viewPopupButton;

	createdAtData.unshift(checkSameYear(new Date().format()));
	closeLayer();
}

//트윗 등록 팝업 열기
document.querySelector('.button_write_tweet').addEventListener('click', function() {
	document.getElementById('body').style.overflow= 'hidden';
	document.getElementById('input_tweet').value = '';
	document.querySelector('.dimmed').classList.add('on_new_tweet');
}, false);

//팝업 닫기
function closeLayer() {
	let dimmed = document.querySelector('.dimmed');

	if (dimmed.classList.contains('on_new_tweet')) {
		dimmed.classList.remove('on_new_tweet');
	} else if (dimmed.classList.contains('on_view_timeline')) {
		dimmed.classList.remove('on_view_timeline');
	}

	document.getElementById('body').style.removeProperty('overflow');
}

document.addEventListener('click', function(e) {
	if (e.target.className === 'button_close_layer' || e.target.classList.contains('dimmed')) {
		closeLayer();
	}
}, false)

//트윗 등록
document.querySelector('.submit_tweet').addEventListener('click', submitNewTweet, false);

//작성자 클릭시 작성자 타임라인 팝업으로 보기
function timelinePopSortByWriter (e) {
	let timelineUl = document.querySelector('.dimmed .list_comments');
	let currentList = Array.prototype.slice.call(document.querySelector('.content .list_comments').childNodes);
	
	selectedWriter = e.target.parentElement.parentElement.querySelector('.sorting').textContent;
	writer.innerHTML = `<strong>${selectedWriter}</strong> 님의 타임 라인`; 

	if (timelineUl.hasChildNodes()) {
		while (timelineUl.firstChild) {
			timelineUl.removeChild(timelineUl.firstChild);
		}
	}

	for (let i = 0; i < currentList.length; i++) {
		if (currentList[i].childNodes[1].textContent === selectedWriter) {
			let appendedLi = timelineUl.appendChild(document.createElement('li'));
			appendedLi.className = 'comment';

			appendedLi.appendChild(document.createElement('div')).textContent = currentList[i].childNodes[0].textContent;
			appendedLi.appendChild(document.createElement('div')).textContent = currentList[i].childNodes[1].textContent;
			appendedLi.appendChild(document.createElement('div')).innerHTML = currentList[i].childNodes[2].innerHTML;
		}
	}
}

//작성자 클릭시 작성자 타임라인 보기
function timelineSortByWriter (e) {
	let arr = [], sortingWriter;

	originUL = Array.prototype.slice.call(document.querySelector('.list_comments').childNodes);
	createdAtDataOnSorting = [];
	sortingWriter = e.target.textContent;
	ul.classList.add('on_sorting');

	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}

	originUL.forEach(function(item, index) {
		if (item.childNodes[1].textContent === sortingWriter) {
			arr.push(item);
			createdAtDataOnSorting.push(createdAtData[index]);
			item.childNodes[1].classList.remove('sorting');
		}
	});

	arr.forEach(function(item) {
		if (item.childElementCount >= 4) {
			item.removeChild(item.lastChild);
		}

		ul.appendChild(item);
	});
}

document.addEventListener('click', function(e) {
	if (e.target.className === 'sorting') {
		document.querySelector('.button_write_tweet').style.display = 'none';
		document.querySelector('.button_back').style.display = 'block';
		timelineSortByWriter(e);
	}

	if (e.target.className === 'material-icons') {
		document.getElementById('body').style.overflow = 'hidden';
		document.querySelector('.dimmed').classList.add('on_view_timeline');
		timelinePopSortByWriter(e);
	}
}, false);

document.querySelector('.button_back').addEventListener('click', function () {
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
	ul.classList.remove('on_sorting');

	originUL.forEach(function(item) {
		if (item.childElementCount < 4) {
			item.appendChild(document.createElement('div')).innerHTML = viewPopupButton;
		}

		if (!item.childNodes[1].classList.contains('sorting')) {
			item.childNodes[1].classList.add('sorting');
		}

		ul.appendChild(item);
	});

	document.querySelector('.button_write_tweet').style.display = 'block';
	document.querySelector('.button_back').style.display = 'none';
});

//타임스탬프
function timeDiff(createdAt) {
	let nowTimeStamp = Math.round(new Date().getTime() / 1000),
		createdDate = createdAt.split(' ')[0],
		createdTime = createdAt.split(' ')[1],
		createdYYYY, createdMM, createdDD, converToTimeStampFormat, createdTimeStamp, elapsedSeconds,
		secondsPerMinutes = 60,
		secondsPerHours = secondsPerMinutes * 60,
		secondsPerDay = secondsPerHours * 24,
		secondsPerMonth = secondsPerDay * 30;
	
	if (createdDate.length === 5) {
		createdYYYY = new Date().getFullYear();
		createdMM = Number(createdDate.slice(0, 2));
		createdDD = Number(createdDate.slice(3));
	} else {
		return createdAt;
	}

	converToTimeStampFormat = `${createdMM}.${createdDD}.${createdYYYY} ${createdTime}`;
	createdTimeStamp = new Date(converToTimeStampFormat).getTime() / 1000;

	elapsedSeconds = nowTimeStamp - createdTimeStamp;

	if (elapsedSeconds < 5) {
		return '<span>Just Now</span>';
	} else if (elapsedSeconds < secondsPerMinutes) {
		return `<span>${elapsedSeconds}s ago</span>`;
	} else if (elapsedSeconds < secondsPerHours) {
		return `<span>${Math.floor(elapsedSeconds / secondsPerMinutes)}m ago</span>`;
	} else if (elapsedSeconds < secondsPerDay) {
		return `<span>${Math.floor(elapsedSeconds / secondsPerHours)}h ago</span>`;
	} else if (elapsedSeconds < secondsPerMonth) {
		return `<span>${Math.floor(elapsedSeconds / secondsPerDay)}day(s) ago</span>`;
	}

	return createdAt;
}

clearID = window.setInterval(realTimeTimeDiff, 5000);

function realTimeTimeDiff () {
	for (let i = 0; i < ul.childElementCount; i++) {
		if (ul.classList.contains('on_sorting')) {
			ul.childNodes[i].childNodes[2].innerHTML = timeDiff(createdAtDataOnSorting[i]);
		} else {
			ul.childNodes[i].childNodes[2].innerHTML = timeDiff(createdAtData[i]);
		}
	}
}
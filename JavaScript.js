var index = 0,numberOfCnvs = 0;
var ctx,ctx2;
var current = -1, deleted = -1;
var tool = -1;
var Rad = 3;
var barCondition = false;
var spikes;

function init(){
	

	projectName.addEventListener("keypress",Submiter);
	document.body.addEventListener("mousemove",Colorupdater);
	document.body.addEventListener("mousemove",Widthupdater);
	upload.addEventListener('submit',pictUpload);
	//menuButton.addEventListener("onclick",barInteraction);
}

function pictUpload(e) {
    e.preventDefault();
    const formData = new FormData(this);
	  const ff = formData.get('pict');
    if(current != -1){
	    if (ff.name != ''){
		    const img = document.createElement('img');
		    reader = new FileReader();
		    reader.readAsDataURL(ff);

		    reader.onloadend = function () {
		        img.src = reader.result;
		        setTimeout(()=>{ ctx.drawImage(img,0,0);});
		        f.value= null;
		    }
		  }
		  else{
		  	alert('Следует загрузить файл перед открытием!');
		  }
	  }
	  else{
	  	if (ff.name != ''){
		  	projectName.value = "Untitled";
		  	creating();
		  	setTimeout(() => {ss.click();});
		  }
		  else{
		  	alert('Следует загрузить файл перед открытием!');
		  }
	  }
}

function preDownloader(){
	if(current != -1){
		popup1.style.display = 'block';
	}
	else{
		alert('Создайте новый или переключитесь на существующий холст для сохранения')
	}
}

function Downloader(num){
	const myCanv = document.getElementById('cnvs' + current).children[1];
	const link = document.createElement('a');
	link.setAttribute("href", myCanv.toDataURL("image/jpeg"));
	if(num == 0){
		
		link.setAttribute("download", document.getElementById('nameOfFile' + current).innerHTML);
		
	}
	else{
		link.setAttribute("download", document.getElementById('nameOfFile' + current).innerHTML + '.bmp');
	}
	link.click();
	popup1.style.display = 'none';
}

function toolChange(num){
	if(tool != -1){
		document.getElementById('txt'+tool).style.color = 'grey';
		document.getElementById('txt'+tool).style.textAlign = 'left';
		document.getElementById('txt'+tool).style.fontSize = '30px';
		document.getElementById('svg'+tool).style.fill = '#a1a1a1';
		document.getElementById('tool'+tool).style.background = 'none';
		tool = num;
		document.getElementById('txt'+num).style.color = 'white';
		document.getElementById('txt'+num).style.textAlign = 'center';
		document.getElementById('txt'+num).style.fontSize = '40px';
		document.getElementById('svg'+num).style.fill = 'black';
		document.getElementById('tool'+num).style.background = 'white';
	}
	else{
		tool = num;
		document.getElementById('txt'+num).style.color = 'white';
		document.getElementById('txt'+num).style.textAlign = 'center';
		document.getElementById('txt'+num).style.fontSize = '40px';
		document.getElementById('svg'+num).style.fill = 'black';
		document.getElementById('tool'+num).style.background = 'white';
	}

	if(tool == 4){
		let check = 'as5';
		console.log(check.includes('.'));
		while(isNaN(check) || Number.isInteger(+check) == false || (+check) < 0 || String(check).includes('.'))
		{
			check = +prompt("Введите количество вершин", 5);

			if(isNaN(check) || Number.isInteger(+check) == false || (+check) < 0 || String(check).includes('.'))
			{
				alert('Введите целое положительное число!');
			}
		}
		spikes =+check;
	}
}

function abouter(){
	popup2.style.display = 'block';
}

function abouterClose(){
	popup2.style.display = 'none';
}


function toolHover(num){
	if(num != tool){
		document.getElementById('txt'+num).style.color = '#c9c9c9';
		document.getElementById('txt'+num).style.textAlign = 'center';
		document.getElementById('txt'+num).style.fontSize = '35px';
		document.getElementById('svg'+num).style.fill = 'white';
	}
}

function toolOut(num){
	if(num != tool){
		document.getElementById('txt'+num).style.color = 'grey';
		document.getElementById('txt'+num).style.textAlign = 'left';
		document.getElementById('txt'+num).style.fontSize = '30px';
		document.getElementById('svg'+num).style.fill = '#a1a1a1';
	}
}

function barInteraction(){
	if(barCondition){
		var lbtn = 269, lbar = 0, ltab = 250;
		let timer = setInterval(function(){
          lbtn-=3;
          lbar-=3;
          ltab-=3;
        menuButton.style.left = lbtn +"px";
        menuBar.style.left = lbar +"px";
        Tabs.style.left = ltab +"px";
        if(ltab<3){
          clearInterval(timer);
          barCondition = false;
          }
        },5);
	}
	else{
		var lbtn = 19, lbar = -250, ltab = 0;
		let timer = setInterval(function(){
          lbtn+=5;
          lbar+=5;
          ltab+=5;
        menuButton.style.left = lbtn +"px";
        menuBar.style.left = lbar +"px";
        Tabs.style.left = ltab +"px";
        if(ltab>245){
          clearInterval(timer);
          barCondition = true;
          }
        },5);
	}
}

function Colorupdater(){
	if(ctx != null){
		ctx.strokeStyle = colorpicker.value;
		ctx2.strokeStyle = colorpicker.value;
	}
}

function Widthupdater(){
	if(ctx != null){
		ctx.lineWidth = polz.value;
		ctx2.lineWidth = polz.value;
		Rad = polz.value/2;
	}
}

function Submiter(e){
	e.preventDefault();
	const keyy = e.key;
	if(keyy == "Enter"){
		creating();
	}
	else{
		projectName.value += e.key;
	}
}

function creating(){
	if(projectName.value != ""){
		numberOfCnvs ++;
		if(numberOfCnvs <6){
			createCanvas();
			createTab();
			switching(index);
			index++;
		}
		else{
			alert("Невозможно создать больше 5 холстов!");
			numberOfCnvs --;
			projectName.value = "";
		}
	}
	else{
		//alert("Введите название холста!");
		unnamed();
	}
}

function unnamed(){
	let a = 255;
	projectName.style.background = "rgb("+a+",0,0)";
	let timer = setInterval(function(){
          a-=5;
        projectName.style.background = "rgb("+a+",0,0)";
        if(a<5){
          clearInterval(timer);
          projectName.style.background = "transparent";
          }
        },5);

}

function Inputer(text,defaultValue){
	let num = 'as5';
		console.log(num.includes('.'));
		while(isNaN(num) || Number.isInteger(+num) == false || (+num) < 1 || String(num).includes('.'))
		{
			num = +prompt(text, defaultValue);

			if(isNaN(num) || Number.isInteger(+num) == false || (+num) < 1 || String(num).includes('.'))
			{
				alert('Введите целое положительное число!');
			}
		}
		num =+num;
	return num;
}

function createCanvas(){
	const w = Inputer('Введите ширину холста: ', 1200);
	const h = Inputer('Введите высоту холста: ', 800);
	const div = document.createElement('div');
	div.className = "cnvs_holder"
	div.id = 'cnvs' + index;
	div.style.width = w + 'px';
	div.style.height = h + 'px';

	const cnvs2 = document.createElement('canvas');
	cnvs2.width = w;
	cnvs2.height = h;
	cnvs2.className = "cnvs2";
	cnvs2.getContext('2d').clearRect(0, 0, w, h);
	//cnvs.setAttribute('id','cnvs' + index);
	div.append(cnvs2);

	const cnvs = document.createElement('canvas');
	cnvs.width = w;
	cnvs.height = h;
	cnvs.className = "cnvs"
	cnvs.getContext('2d').fillStyle = '#ffffff';
	cnvs.getContext('2d').fillRect(0,0,w,h);
	//cnvs.setAttribute('id','cnvs' + index);
	div.append(cnvs);
	holder.prepend(div);
}

function createTab(){
	const div = document.createElement('div');
	div.className = "Tab"
	div.id = 'tab' + index;
	//div.setAttribute('onclick','switching('+index+');');

	const div2 = document.createElement('div');
	div2.className = "Naming"
	div2.id = "nameOfFile" + index;
	//div2.innerHTML = "Без названия "+(index+1);
	div2.innerHTML = projectName.value;
	div2.setAttribute('onclick','switching('+index+');');

	projectName.value = '';

	const but = document.createElement('input');
	but.className = "cross";
	but.value = "✕"
	but.type = "button"
	but.id = 'cross' + index;
	but.setAttribute('onclick','delet('+index+');');

	div.append(div2);
	div.append(but);
	//div.innerHTML = "Без названия " + index;
	Tabs.append(div);
}

function delet(num){
	const verify = confirm('Вы уверены, что хотите закрыть окно, не сохранив его? Для подтверждения нажми "ОК"');
	if(verify){
		Tabs.removeChild(document.getElementById('tab'+num));
		holder.removeChild(document.getElementById('cnvs'+num));
		numberOfCnvs--;
		deleted = num;
		if(num == current){
			current = -1;
		}
	}
	else{
		if(!barCondition){
			barInteraction();
		}
	}
}

function switching(num){
	/*for (var i = 0; i < index; i++) {
		if(i!=num){
			document.getElementById('cnvs' + i).style.display = 'none';
			document.getElementById('tab' + i).style.background = 'gray';
			document.getElementById('tab' + i).style.borderColor = 'gray';
		}
	}*/
	const a = [num,current,deleted];
	if(current != -1 & current != deleted){
		document.getElementById('cnvs' + current).style.display = 'none';
		document.getElementById('tab' + current).style.background = 'gray';
		document.getElementById('tab' + current).style.borderColor = 'gray';
	}

	document.getElementById('cnvs' + num).style.display = 'block';
	document.getElementById('tab' + num).style.background = 'white';
	document.getElementById('tab' + num).style.borderColor = 'white';
	//projectName.value = document.getElementById('nameOfFile' + num).innerHTML;
	ctx = document.getElementById('cnvs' + num).querySelectorAll('.cnvs')[0].getContext('2d');
	ctx2 = document.getElementById('cnvs' + num).querySelectorAll('.cnvs2')[0].getContext('2d');
	current = num;
	document.getElementById('cnvs' + num).addEventListener('mouseover', toolSelection);
	document.getElementById('cnvs' + num).addEventListener('mouseenter',cursorChanger);
	document.getElementById('cnvs' + num).addEventListener('mouseleave', () => document.body.style.cursor = "default");
}

function toolSelection(){
	switch(tool){
		case 0:
			//document.getElementById('cnvs' + current).removeEventListener('mousedown', toolSelection);
			//ctx.scale(2,2)
			document.getElementById('cnvs' + current).addEventListener('mousedown', canvasArrow);
			document.getElementById('cnvs' + current).addEventListener('mouseout', ()=> document.getElementById('cnvs' + current).removeEventListener('mousedown', canvasArrow));
			break;
		case 1:
			document.getElementById('cnvs' + current).addEventListener('mousedown', canvasLine);
			document.getElementById('cnvs' + current).addEventListener('mouseout', ()=> document.getElementById('cnvs' + current).removeEventListener('mousedown', canvasLine));
			break;
		case 2:
			document.getElementById('cnvs' + current).addEventListener('mousedown', canvasEllipse);
			document.getElementById('cnvs' + current).addEventListener('mouseout', ()=> document.getElementById('cnvs' + current).removeEventListener('mousedown', canvasEllipse));
			break;
		case 3:
			document.getElementById('cnvs' + current).addEventListener('mousedown', canvasEraser);
			//document.body.removeEventListener("mousemove",Colorupdater);
			//colorpicker.value = '#FFFFFF';
			document.getElementById('cnvs' + current).addEventListener('mouseout', ()=> {document.getElementById('cnvs' + current).removeEventListener('mousedown', canvasEraser);});
			break;
		case 4:
			document.getElementById('cnvs' + current).addEventListener('mousedown', canvasStar);
			document.getElementById('cnvs' + current).addEventListener('mouseout', ()=> document.getElementById('cnvs' + current).removeEventListener('mousedown', canvasStar));
			break;
		case 5:

			break;
	}
}

function cursorChanger(){
	switch(tool){
		case 0:
			document.body.style.cursor = "url(\'cursor/Arrow.cur\'), pointer";
		break;
		case 1:
			document.body.style.cursor = "url(\'cursor/Cross.cur\'), pointer";
		break;
		case 2:
			document.body.style.cursor = "crosshair";
			break;
		case 3:
			//document.body.style.cursor = "url(\'cursor/Empty_red.cur\'), pointer";
			document.body.style.cursor = "none";
			document.getElementById('cnvs' + current).addEventListener('mousemove', cursorEraser);
			document.getElementById('cnvs' + current).addEventListener('mouseout', () => {document.getElementById('cnvs' + current).removeEventListener('mousemove', cursorEraser); ctx2.clearRect(0, 0, 1200, 800);});
			break;
		case 4:
			document.body.style.cursor = "crosshair";
			break;
		case 5:

			break;
	}
}

function canvasArrow(e){
	console.log('drawing')
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(e.offsetX, e.offsetY);
	ctx.lineTo(e.offsetX - e.movementX,e.offsetY - e.movementY);
	ctx.stroke();
	document.getElementById('cnvs' + current).addEventListener('mousemove', drawer);

	function drawer(e){
		ctx.moveTo(e.offsetX, e.offsetY);
		ctx.lineTo(e.offsetX - e.movementX,e.offsetY - e.movementY);
		ctx.stroke();
	}

	document.onmouseup = function(){
		document.getElementById('cnvs' + current).removeEventListener('mousemove', drawer);
		document.onmouseup = null;
		ctx.closePath();
	}
	ctx.closePath();
	//document.getElementById('cnvs' + current).addEventListener('mousedown', toolSelection);
}

function canvasLine(e){
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(e.offsetX, e.offsetY);
	const pos = [e.offsetX,e.offsetY];
	ctx.lineTo(e.offsetX - e.movementX,e.offsetY - e.movementY);
	ctx.stroke();

	const currentCanvasHolder = document.getElementById('cnvs' + current);

	currentCanvasHolder.removeEventListener('mouseover', toolSelection);
	currentCanvasHolder.removeEventListener('mousedown', canvasLine);
	currentCanvasHolder.addEventListener('mousemove', drawer);
	currentCanvasHolder.addEventListener('mousedown', secondPoint);
	
	ctx2.lineCap = 'round';
	const currentCanvas2 = document.getElementById('cnvs' + current).querySelector('.cnvs2');
	function drawer(e){
		ctx2.clearRect(0, 0, currentCanvas2.width, currentCanvas2.height); //improve
		ctx2.beginPath();
		ctx2.moveTo(pos[0], pos[1]);
		ctx2.lineTo(e.offsetX,e.offsetY);
		ctx2.stroke();
		ctx2.closePath();
	}

	function secondPoint(e){
		document.getElementById('cnvs' + current).removeEventListener('mousemove', drawer);
		document.getElementById('cnvs' + current).removeEventListener('mousedown', secondPoint);
		ctx2.clearRect(0, 0, currentCanvas2.width, currentCanvas2.height);
		ctx.beginPath();
		ctx.moveTo(pos[0], pos[1]);
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
		ctx.closePath();
		document.getElementById('cnvs' + current).addEventListener('mousedown', canvasLine);
		document.getElementById('cnvs' + current).addEventListener('mouseover', toolSelection);
	}
	//document.getElementById('cnvs' + current).addEventListener('mousedown', toolSelection);
}

function canvasEraser(e){
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'white';
	ctx.beginPath();
	ctx.moveTo(e.offsetX, e.offsetY);
	ctx.lineTo(e.offsetX - e.movementX,e.offsetY - e.movementY);
	ctx.stroke();
	document.getElementById('cnvs' + current).addEventListener('mousemove', drawer);
	document.body.removeEventListener("mousemove",Colorupdater);
	document.addEventListener('mouseup',erUpper);

	function drawer(e){
		ctx.moveTo(e.offsetX, e.offsetY);
		ctx.lineTo(e.offsetX - e.movementX,e.offsetY - e.movementY);
		ctx.stroke();
	}

	function erUpper(){
		document.body.addEventListener("mousemove",Colorupdater);
		document.getElementById('cnvs' + current).removeEventListener('mousemove', drawer);
		document.removeEventListener('mouseup',erUpper);
		document.onmouseup = null;
		ctx.closePath();
	}
}

function cursorEraser(e){
	const currentCanvas2 = document.getElementById('cnvs' + current).querySelector('.cnvs2');

	ctx2.clearRect(0, 0, currentCanvas2.width, currentCanvas2.height);
	ctx2.strokeStyle = 'red';
	if(Rad >= 20){
		ctx2.lineWidth = Rad/20;
	}
	else{
		ctx2.lineWidth = 2;
	}
	ctx2.beginPath();
	ctx2.arc(e.offsetX, e.offsetY, Rad, 0, 2 * Math.PI);
	ctx2.stroke();
	ctx2.closePath();
}

function canvasEllipse(e){
	ctx.lineCap = 'round';
	const pos = [e.offsetX,e.offsetY];
	var radd;
	document.getElementById('cnvs' + current).addEventListener('mousemove', ellipseOn);
	document.addEventListener('mouseup',elUpper);

	const currentCanvas2 = document.getElementById('cnvs' + current).querySelector('.cnvs2');

	ctx2.lineCap = 'round';
	function ellipseOn(e){
		ctx2.clearRect(0, 0, currentCanvas2.width, currentCanvas2.height);
		ctx2.beginPath();
		ctx2.ellipse(pos[0], pos[1], Math.abs(pos[0] - e.offsetX), Math.abs(pos[1] - e.offsetY), 0, 0, Math.PI*2);
		radd = [Math.abs(pos[0] - e.offsetX), Math.abs(pos[1] - e.offsetY)];
		ctx2.stroke();
		ctx2.closePath();
	}

	function elUpper(e){
		document.getElementById('cnvs' + current).removeEventListener('mousemove', ellipseOn);
		ctx2.clearRect(0, 0, currentCanvas2.width, currentCanvas2.height);
		ctx.beginPath();
		ctx.ellipse(pos[0], pos[1], radd[0], radd[1], 0, 0, Math.PI*2);
		document.removeEventListener('mouseup',elUpper);
		//ctx.moveTo(pos[0], pos[1]);
		//ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
		ctx.closePath();
	}

}

function canvasStar(e){
	const startX = e.offsetX, startY = e.offsetY;

	//document.getElementById('cnvs' + current).addEventListener('mousemove', starOn);
	document.addEventListener('mousemove', starOn);
	document.addEventListener('mouseup',stUp);

	const currentCanvas2 = document.getElementById('cnvs' + current).querySelector('.cnvs2');

	function starOn(e){
		ctx2.clearRect(0, 0, currentCanvas2.width, currentCanvas2.height);
		let endX = e.offsetX;
    	let endY = e.offsetY;

    	let diffX = Math.abs(startX - endX);
    	let diffY = Math.abs(startY - endY);

	    let outerRadius = Math.min(diffX, diffY) / 2;
	    let innerRadius = Math.round(outerRadius * 0.38);

	    let [centerX, centerY] = countCenters(startX, startY, endX, endY, outerRadius);

	    drawStar(ctx2, centerX, centerY, spikes, outerRadius, innerRadius);
	}

	function stUp(e){
		//document.getElementById('cnvs' + current).removeEventListener('mousemove', starOn);
		document.removeEventListener('mousemove', starOn);
		document.removeEventListener('mouseup',stUp);
		const endX = e.offsetX;
    	const endY = e.offsetY;

    	const diffX = Math.abs(startX - endX);
    	const diffY = Math.abs(startY - endY);

	    const outerRadius = Math.min(diffX, diffY) / 2;
	    const innerRadius = Math.round(outerRadius * 0.38);

	    const [centerX, centerY] = countCenters(startX, startY, endX, endY, outerRadius);

	    drawStar(ctx, centerX, centerY, spikes, outerRadius, innerRadius);
	}
}

function drawStar(cont,cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  cont.beginPath();
  cont.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    cont.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    cont.lineTo(x, y);
    rot += step;
  }
  cont.lineTo(cx, cy - outerRadius);
  cont.closePath();
  cont.stroke();
  console.log('Star complete');
}

function prepareDrawStar(e) {
	const endX = e.offsetX;
    const endY = e.offsetY;

    const diffX = Math.abs(startX - endX);
    const diffY = Math.abs(startY - endY);

    const outerRadius = Math.min(diffX, diffY) / 2;
    const innerRadius = Math.round(outerRadius * 0.38);

    const [centerX, centerY] = countCenters(startX, startY, endX, endY, outerRadius);

    drawStar(centerX, centerY, spikes, outerRadius, innerRadius);
}

function countCenters(startX, startY, endX, endY, radius) {
    const diffX = Math.abs(startX - endX);
    const diffY = Math.abs(startY - endY);

    let centerX;
    let centerY;

    if (diffX > diffY) {
        if (startX > endX) {
            centerX = Math.max(startX, endX) - radius;
            centerY = Math.min(startY, endY) + radius;
        } else {
            centerX = Math.min(startX, endX) + radius;
            centerY = Math.max(startY, endY) - radius;
        }
    } else {
        if (startY > endY) {
            centerX = Math.min(startX, endX) + radius;
            centerY = Math.max(startY, endY) - radius;
        } else {
            centerX = Math.max(startX, endX) - radius;
            centerY = Math.min(startY, endY) + radius;
        }
    }

    return [centerX, centerY];
}
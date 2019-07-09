<?php 


 
?>

<!DOCTYPE html>
<html>
<head>
	<title>Drop</title>
	<!-- css -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

<style type="text/css">
	.dragAndDrop-container {	
		height: 150px;
		width: 500px;
		margin: 0 auto;
	}
	.dragAndDrop-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.dragAndDrop-wrapper > label[for="dragAndDrop"] {
		border: 2px dashed #91b0b3;
		color: #92b0b3;
		position: absolute;
		height: 100%;
		width: 100%;	
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: 0.5s;
	}
	.dragAndDrop-wrapper:hover > label[for="dragAndDrop"] {
		background: rgba(173,223,238,0.3);
		border-color: rgba(173,223,238, 0.8);
		-webkit-box-shadow: 0px 0px 10px 1px rgba(173,223,238,0.5);
		-moz-box-shadow: 0px 0px 10px 1px rgba(173,223,238,0.5);
		box-shadow: 0px 0px 10px 1px rgba(173,223,238,0.5);
		/*transition: 0.5s;*/
	}
	.dragAndDrop-wrapper #dragAndDrop, .dragAndDrop-wrapper #dragAndDrop:focus {
		position: absolute;
		outline: none !important;
		width: 100%;
		height: 100%;
		cursor: pointer;
		opacity: 0;
		/*visibility: hidden;*/

	}
	.dragAndDrop-container #images-preview {
		width: 100%;
	}
	.dragAndDrop-container .images-preview:before, #images-preview:after {
		display: block;
		clear: both;
		content: '';
	}
	.dragAndDrop-container #images-preview .image-box{
		width: calc(33.33% - 4px);
		height: 85px;
		float: left;
		position: relative;
		border: 2px dashed rgba(173,223,238,0.5);
		border-radius: 3px;
		margin-left: 2px;
		margin-right: 2px; 
		margin-bottom: 2px;
	}

	.dragAndDrop-container #images-preview .image{
		height: 100%;
		width: 100%;
  		display: block;
  		padding: 5px;
	}
	.dragAndDrop-container #images-preview .image-preview-name{

	}

	.dragAndDrop-container #images-preview .delete-image {
		position: absolute;
		top: 3px;
		right: 3px;
		font-size: 20px;
		cursor: pointer;
		color: #ff6961;
	}

	.dragAndDrop-container #images-preview .image-name {
		position: absolute;
		left: 10px;
		right: 10px;
		bottom: 5px;
		color: #555;
		font-size: 14px;
		font-style: italic;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}


</style>

</head>
<body>

	<form action="./index.php" method="post" id="form" enctype="multipart/form-data">
		<div class="dragAndDrop-container">
		  <div class="form-group dragAndDrop-wrapper" >
		    <label for="dragAndDrop">
		    	<span>
		    		Drop files here or click to select
		    	</span>
		    	<i class="fa fa-upload" aria-hidden="true"></i>
		    	<span class="image-to-upload-count"></span>
		    </label>
		    <input type="file" class="form-control" id="dragAndDrop" aria-describedby="dragAndDrop" placeholder="Drag and Drop" multiple >
		  </div>
		  <div id="images-preview">
		  </div>
		</div>
		<div class="form-group">
			<label>label</label>
			<input type="text" class="form-control" name="test"/>
		</div>
	  <div class="form-group text-right">
	  	<button type="submit" class="btn btn-primary submit">Submit</button>
	  </div>
	</form>

<!-- JS -->
<script
  src="https://code.jquery.com/jquery-3.4.1.js"
  integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
  crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script type="text/javascript" src="./drag_pl.js"></script>
<script type="text/javascript">
	/* 
		$("label[for='dragAndDrop']").change(function(event){
			event.preventDefault();
			console.log(event);
		});
	*/
$(function(){

	$("#form").customImageUploader({opt: 'opt'});

	

	$("#form").submit(function(e){
		e.preventDefault();
		let formData = new FormData(this);
		let src = $('#images-preview').find('img')
		const imagesToUpload = $(this).customImageUploaderImages();

		imagesToUpload.forEach(function(item, index){
			// console.log(item)
			const mime = item.type&&item.type.split('/')&&item.type.split('/')[1]?item.type.split('/')[1]:null;
			item.name =  'tmp_.'+ mime || 'tmp_.jpg'
			formData.append("image_ulpad_"+index, item, 'tmp_.'+ mime || 'tmp_.jpg'); 
		})
		// $.each(src, function(index, value){
		// 	let newFile = dataURLtoFile($(this).attr('src'), 'tmp-image-'+index+'.jpg');
		// 	const mime = newFile.type&&newFile.type.split('/')&&newFile.type.split('/')[1]?newFile.type.split('/')[1]:null;
		// 	newFile.name =  'tmp_.'+mime || 'tmp_.jpg'
		// 	formData.append("image_ulpad_"+index, newFile, 'tmp_.'+mime || 'tmp_.jpg'); 
		// })
        $.ajax({
            url: './index.php',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function(response){
                // console.log('response: ', response);
            }
        }); 

	});

	// function readFile(input, e) {
	//   if (input.files && input.files.length) {
	//   	for (let i = 0;i<=input.files.length-1;i++) {
	//   		console.log(input.files[i])
	//   		toDataUrl(input.files[i], i, input.files);
	//   	}
	//   }
	// }

	// function toDataUrl(file, index, files) {
	// 	if (!file) { return; }
	// 	const reader = new FileReader();
	//     reader.onload = function(e) {
	//     	let imagePreview = $("#images-preview"),
	//     		imageTag     = $('<img/>').attr('src', e.target.result).addClass('image'),
	//     		imageName    = $('<span/>').addClass('image-preview-name'),
	//     		iamgeBox     = $('<div/>').addClass('image-box'),
	//     		inputHidden  = $('<input />').prop('type', 'file')
	//     		callback     = function(e){
	//     			e.preventDefault();
	//     			$(this).parent().remove();
	//     			imageCount($('#images-preview').find('img').length);
	//     		},
	//     		deleteBtn 	 = $('<i/>').addClass('delete-image fa fa-times-circle-o').click(callback),
	//     		imageName    = $('<span/>').addClass('image-name').text(file.name || '---');
	    		
	//     	iamgeBox.append(imageTag, imageName, deleteBtn);
	//     	imagePreview.append(iamgeBox);
	//     	imageCount($('#images-preview').find('img').length);
	//     };
	//     reader.readAsDataURL(file);
	// }

	// $("#dragAndDrop").click(function(){
	// 	$("#form")[0].reset();
	// })


	// $("#dragAndDrop").change(function(event){
	// 	const _this = this;
	// 	event.preventDefault();
	// 	readFile(this, event);
	// });

	// function imageCount(number) {
	// 	let counterField = $('.image-to-upload-count'),
	// 		img = $('#images-preview').find('img');
	// 	counterField.text(`${number} selected images`);	
	// }

})	

// function dataURLtoFile(dataurl, filename) {
//     // console.log(dataurl.split(','),dataurl.split(',')[0].match(/:(.*?);/)[1]);
//     var arr = dataurl.split(','), 
//         mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), 
//         n = bstr.length, 
//         u8arr = new Uint8Array(n);
//     while(n--){
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, {type:mime});
// }

</script>
<!-- end body -->
</body>
</html>
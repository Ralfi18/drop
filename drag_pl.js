(function( $ ) {
 
    $.fn.extend({ 
    	customImageUploader: function(options) {
    		console.log('options: ', options);
	    	let form = $(this),
	    		dragAndDrop = form.find('#dragAndDrop'),
				imagePreview = form.find('#images-preview');

			/*
			 *	TODO: use options to modify the output (height, with etc..)
			 */	

	    	dragAndDrop.change(function(event){
				event.preventDefault();
				readFile(this, event);
	    	});

    		dragAndDrop.click(function(){
				form[0].reset();
			})

	    	const readFile = function(input, _event) {
	    		if (input && _event) {
	    			if (input.files && input.files.length) {
						for (let i = 0;i<=input.files.length-1;i++) {
							toDataUrl(input.files[i], i, input.files);
						}
					}
	    		}
			}

			const toDataUrl = function(file, index, files) {

				if (!file) { return; }

				const reader = new FileReader();
			    reader.onload = function(e) {
			    	let	imageTag     = $('<img/>').attr('src', e.target.result).addClass('image'),
			    		imageName    = $('<span/>').addClass('image-preview-name'),
			    		iamgeBox     = $('<div/>').addClass('image-box'),
			    		inputHidden  = $('<input />').prop('type', 'file')
			    		callback     = function(e){
			    			e.preventDefault();
			    			$(this).parent().remove();
			    			imageCount($('#images-preview').find('img').length);
			    		},
			    		deleteBtn 	 = $('<i/>').addClass('delete-image fa fa-times-circle-o').click(callback),
			    		imageName    = $('<span/>').addClass('image-name').text(file.name || '---');
			    		
			    	iamgeBox.append(imageTag, imageName, deleteBtn);
			    	imagePreview.append(iamgeBox);
			    	imageCount($('#images-preview').find('img').length);
			    };
			    reader.readAsDataURL(file);
			}

			const imageCount = function(number) {
				let counterField = form.find('.image-to-upload-count');
				counterField.text(`${number} selected images`);	
			}
	    },
	    customImageUploaderImages: function() {
	    	let form = $(this),
	    		dragAndDrop = form.find('#dragAndDrop'),
				imagePreview = form.find('#images-preview'),
				images = imagePreview.find('img');

			const dataURLtoFile = function(dataurl, filename) {
			    var arr = dataurl.split(','), 
			        mime = arr[0].match(/:(.*?);/)[1],
			        bstr = atob(arr[1]), 
			        n = bstr.length, 
			        u8arr = new Uint8Array(n);
			    while(n--){
			        u8arr[n] = bstr.charCodeAt(n);
			    }
			    return new File([u8arr], filename, {type:mime});
			}

			if(images) {
				const imgSrcArr = [];
				$.each(images, function(index, value){
					imgSrcArr.push( dataURLtoFile($(this).attr('src'), 'tmp-image-'+index+'.jpg') );

				});
				return imgSrcArr;
			}	
	    }
    });
 	
}( jQuery ));
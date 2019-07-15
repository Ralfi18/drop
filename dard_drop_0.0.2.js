(function( $ ) {
    $.fn.extend({ 
    	customImageUploader: function(options) {
	    	let form = $(this),
	    		dragAndDrop = form.find('#dragAndDrop'),
				imagePreview = form.find('#images-preview'),
				defaultImages = options && options.defaultImages || null;
			/*
			 *	TODO: use options to modify the output (height, with etc..)
			 */	
            const toDataUrl = function(file, files, index) {
				// console.log('toDataUrl', toDataUrl);
				if (!file) { return; }
				const reader = new FileReader();
			    reader.onload = function(e) {
					renderHTML(e.target.result, file.name, index, false);
			    };
			    reader.readAsDataURL(file);
			}
			/**
			 * Render html
			 * @param {*} src 
			 * @param {*} fileName 
			 */
			const renderHTML = function(src, fileName, index, isDefault, seo) {
				let	imageTag = $('<img/>').attr('src', src).addClass('image'),
					fullWrapp = $('<div/>').addClass('full-wrapp'),
					imageBox = $('<div/>').addClass('image-box'),
					callback = function(e){
						e.preventDefault();
						$(this).parents('.full-wrapp').remove();
						imageCount(imagePreview.find('img').length);
						if(imagePreview.find('img') && imagePreview.find('img').length) {
							radioInputsValues(imagePreview);
						}
					},
					radio = $('<input>').attr({
						type:'radio', 
						name: 'isDefault', 
						value: index,
						checked: isDefault && defaultImages.length ? true : index.toString() === "0"
					}),
					inputsWrapp = $('<div/>').addClass('inputs-wrapp'),
					seoTitle 	= $('<input/>').css({margin: '10px 0px'})
						.attr({type:'text',name: 'seoTitle[]', placeholder: 'SEO tittle...'})
						.val(seo && seo[0] ? seo[0] : '')
						.addClass('form-control form-control-sm'),
					seoAlt   	= $('<input/>')
						.attr({type:'text',name: 'seoAlt[]',  placeholder: 'SEO alt...'})
						.val(seo && seo[1] ? seo[1] : '')
						.addClass('form-control form-control-sm'),
					deleteBtn	= $('<i/>').addClass('delete-image fa fa-times-circle-o').click(callback),
					imageName	= $('<span/>').addClass('image-name').text(fileName|| '');
					
				inputsWrapp.append(seoTitle, seoAlt);
				imageBox.append(imageTag, imageName, deleteBtn);
				fullWrapp.append(imageBox, inputsWrapp, radio);

				imagePreview.append(fullWrapp);
				
				imageCount(imagePreview.find('img').length);
				if(imagePreview.find('img') && imagePreview.find('img').length) {
					radioInputsValues(imagePreview);
				}
			}
			/**
			 * 
			 */
			const radioInputsValues = function(imagePreview) {
				$.each(imagePreview.find('img'), function(index, val){
					$(this).parents('.full-wrapp').find('input:radio').val(index.toString());
				});
			}
			/*
			 *	Load default images
			 */ 
			// console.log( "defaultImages: ", defaultImages )
			if (defaultImages && Array.isArray(defaultImages) && defaultImages.length) {
				defaultImages.forEach(function(image, i){
					_toDataURL(image['path'], function(dataUrl){
						renderHTML(
							dataUrl, 
							'', 
							i.toString(), 
							image['is_default'] == '1',
							[image['alt'], image['title']]
						);
					})
				});
			}
	    	dragAndDrop.change(function(event){
				event.preventDefault();
				readFile(this, event);
	    	});
    		dragAndDrop.click(function(){
				$(this).val(function() {
					return this.defaultValue;
				});
			});
	    	const readFile = function(input, _event) {
	    		if (input && _event) {
	    			if (input.files && input.files.length) {
						for (let i = 0;i<=input.files.length-1;i++) {
							let increment = imagePreview.find('img').length ? i + imagePreview.find('img').length : i;
							toDataUrl(input.files[i], input.files, increment.toString());
						}
					}
	    		}
			}
			const imageCount = function(number) {
				let counterField = form.find('.image-to-upload-count');
				counterField.text(`${number} images selected`);
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
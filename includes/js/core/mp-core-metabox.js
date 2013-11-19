jQuery(document).ready(function($){
	
	/**
	 * Handle "Repeaters"
	 */
	 
	//When we click the "Add New" button
	$(document).on("click", ".mp_duplicate", function(){ 
	
		var theoriginal = $(this).parent().parent();
		var theclone = theoriginal.clone();
		var metabox_container = theoriginal.parent();
		var therepeaterclass = '.'+theoriginal.attr('class');
		var name_number = 0;
				
		//Add the clone after the original
		$(theoriginal).after(theclone);
		
		//Set any of the clone's textbox values to be empty
		theclone.find('.mp_repeater').each(function() {
			this.value = '';		
		});	
		
		//Hide any of the clones media images
		theclone.find('.custom_media_image').each(function() {
			$(this).css('display', 'none');		
		});	
		
		//Hide any of the clones icon fonts
		theclone.find('.mp_font_icon_thumbnail').each(function() {
			$(this).css('display', 'none');		
		});	
		
		//Reset the wpColorPicker for each color field in this repeater
		theclone.find('.of-color').each(function() {
			clonecolor = $(this).clone();
			$(this).parent().parent().after(clonecolor);
			$(this).parent().parent().remove();
			clonecolor.wpColorPicker()
		});

		//Reset the names, classes, hrefs, and ids for all fields		
		metabox_container.find(therepeaterclass).each(function(){
			if (name_number != 0){
				
				//Loop through all elements in this repeater and rename
				$(this).find('*').each(function() {
					if ( this.name ){
						this.name = this.name.replace('['+ (name_number-1) +']', '[' + (name_number) +']');
					}
					if ( this.id ){
						this.id= this.id.replace('AAAAA'+ (name_number-1) +'BBBBB', 'AAAAA' + (name_number) +'BBBBB');
					}
					if ( this.className ){
						this.className = this.className.replace('AAAAA'+ (name_number-1) +'BBBBB', 'AAAAA' + (name_number) +'BBBBB');
					}
					if ( this.href ){
						this.href = this.href.replace('AAAAA'+ (name_number-1) +'BBBBB', 'AAAAA' + (name_number) +'BBBBB');
					}
				});	
			}
			name_number = name_number + 1;
		});
		
		name_repeaters();
		
		return false;   
		    
	});
	
	//When we click the remove button
	$(document).on("click", ".mp_duplicate_remove", function(){ 
	
		var theoriginal = $(this).parent().parent();
		var metabox_container = theoriginal.parent();
		var therepeaterclass = '.'+theoriginal.attr('class');
		var name_number = 0;
		
		if ($(therepeaterclass).length > 1){
			//Remove this repeater if it isn't the only one on the page
			$(theoriginal).remove();
		}
		
		//Reset the names and ids for all fields		
		metabox_container.find(therepeaterclass).each(function(){
			if (name_number == 0){
				$(this).find('.mp_repeater').each(function() {
					this.name= this.name.replace('[1]', '[0]');
					this.id= this.id.replace('AAAAA1BBBBB', 'AAAAA0BBBBB');
				});	
			}else{
				$(this).find('*').each(function() {
					if ( this.name ){
						this.name = this.name.replace('['+ (name_number+1) +']', '[' + (name_number) +']');
					}
					if ( this.id ){
						this.id= this.id.replace('AAAAA'+ (name_number+1) +'BBBBB', 'AAAAA' + (name_number) +'BBBBB');
					}
					if ( this.className ){
						this.className = this.className.replace('AAAAA'+ (name_number+1) +'BBBBB', 'AAAAA' + (name_number) +'BBBBB');
					}
					if ( this.href ){
						this.href = this.href.replace('AAAAA'+ (name_number+1) +'BBBBB', 'AAAAA' + (name_number) +'BBBBB');
					}
				});	
			}
			name_number = name_number + 1;
		});
		
		return false;   
		    
	});
	
	//When we roll over the remove button
	$(document).on("hover", ".mp_duplicate_remove", function(){ 
	
		var theoriginal = $(this).parent().parent();
		var metabox_container = theoriginal.parent();
		var therepeaterclass = '.'+theoriginal.attr('class');
		var name_number = 0;
		
		if ($(therepeaterclass).length > 1){
			//Remove this repeater if it isn't the only one on the page
			$(theoriginal).css( 'background-color', '#ffbdbd' );
			$(theoriginal).css( 'border-color', '#ff0000' );
		}
		else{
			$(this).html('Can\'t Remove' );	
		}
		
		
		return false;   
		    
	});
	
	//When we roll out of the remove button
	$(document).on("mouseleave", ".mp_duplicate_remove", function(){ 
	
		var theoriginal = $(this).parent().parent();
		var metabox_container = theoriginal.parent();
		var therepeaterclass = '.'+theoriginal.attr('class');
		var name_number = 0;
		
		if ($(therepeaterclass).length > 1){
			//Remove this repeater if it isn't the only one on the page
			$(theoriginal).css( 'background-color', '');
			$(theoriginal).css( 'border-color', '' );
		}		
		
		$(this).html('Remove' );	
		
		return false;   
		    
	});
	
	//When we click on the toggle for this repeater - hide or show this repeater
	$(document).on("click", '.mp_repeater_handlediv', function(){
		
		var theoriginal = $(this).parent();
		
		var height = $(theoriginal).css('height');
		
		//Hide
		if ( height != '29px' ){
			$(theoriginal).css( 'height', '29px');
		}
		//Show
		else{
			$(theoriginal).css( 'height', 'inherit');
		}
		
	});
	
	//Put the title of this repeater at the top of it based on what is inside of it's first field
	function name_repeaters(){
		
		$('.repeater_container li').each(function(index) {
			
			var thetitle = $(this).find('> .mp_field strong').html();
			var thevalue = $(this).find('> .mp_field > input').val();
			
			if ( thevalue ){		
				$(this).find( '> .mp_drag > span').html(thetitle + ': ' + thevalue);
			}
			else{
				$(this).find( '> .mp_drag > span').html( 'Enter info:' );
			}
		
		});
			
	}
	
	//Apply names of repeater metaboxes on ready
	name_repeaters();
	
	//Apply names of repeater metaboxes when typing in the first field	
	$('.repeater_container li > .mp_field input').on('keyup click blur focus change paste', function() {
		name_repeaters();
	});
	
	//Handle dragging and dropping of repeaters to re-order them. Uses the "sortable" jquery plugin
	$('.repeater_container').sortable({
		handle: '.mp_drag.hndle',
		
		start: function(e, ui){
			$(this).find('.tinyMCE').each(function(){
				tinyMCE.execCommand( 'mceRemoveControl', false, $(this).attr('id') );
			});
		},
		stop: function(e,ui) {
			$(this).find('.tinyMCE').each(function(){
				tinyMCE.execCommand( 'mceAddControl', true, $(this).attr('id') );
				$(this).sortable("refresh");
			});
		}
	});
	
	/**
	 * Icon Font Picker
	 */
	 
	//When Icon Font Picker item is clicked, put it's value in the field and close the thickbox
	$( 'body' ).on( 'click', '.mp_iconfontpicker_item', function(event){
		
		event.preventDefault();
		
		//Get the field ID of the input 
		var field_id = $(this).parent().attr('class');
		
		//Put the icon code selected into the field ID input field
		$( '#'+field_id ).val($(this).find(' > div > div').html());
		
		//Show the icon in the thumbnail area preview
		$( '.mp_field_' + field_id + ' .mp_font_icon_thumbnail > div' ).attr( 'class', $(this).find(' > div > div').html() );
		$( '.mp_field_' + field_id + ' .mp_font_icon_thumbnail' ).css( 'display', 'inline-block' );
		
		//Close the thickbox
		tb_remove();

	});
	
	
	/**
	 * Required Fields - make them red if they are empty
	 */
	 
	//Loop through all required fields
	$('.mp_required').each(function(){
		
		//If this field has a valuein it, make it white
		if( $(this).val() ){
								
			$(this).css('background-color', '#FFFFFF');	

		}
		
		//When we click on or away from this field
		$(this).on('blur', function() {
			
			//If there is a value
			if( $(this).val() ){
								
				$(this).removeAttr( 'style' );
				
				$(this).css('background-color', '#FFFFFF');	
			//If there isn't a value
			}else{
				
				//Make it red
				$(this).css('background-color', '#FFC8C8');	
				$(this).css('display', 'inline-block');
				
			}
			
		});
		
	});
	
	//When the publish button is clicked
	$("#publish").on('click', function(event){
		
		//Make sure all our required fields are visible
		$('.mp_required').each(function(){
			if( !$(this).val() ){
				$(this).css('display', 'inline-block');	
			}
		});
		
	});
	
	//Loop through all required fields
	$('.mp_required').each(function(){
		
		//If this field has a valuein it, make it white
		if( $(this).val() ){
								
			$(this).css('background-color', '#FFFFFF');	

		}
		
		//When we click on or away from this field
		$(this).on('blur', function() {
			
			//If there is a value
			if( $(this).val() ){
								
				$(this).removeAttr( 'style' );
				
				$(this).css('background-color', '#FFFFFF');	
			//If there isn't a value
			}else{
				
				//Make it red
				$(this).css('background-color', '#FFC8C8');	
				$(this).css('display', 'inline-block');
				
			}
			
		});
		
	});
	
	//When the publish button is clicked
	$("#publish").on('click', function(event){
		
		//Make sure all our required fields are visible
		$('.mp_required').each(function(){
			if( !$(this).val() ){
				$(this).css('display', 'inline-block');	
			}
		});
		
	});
	
});
$(document).ready(function() {
    $("form.js-custom-form").on('submit', function(e) {
        e.preventDefault();
        
        var $form = $(this);
        var $successNote = $(".custom-marketplace-form__note");
        $successNote.hide().removeClass('error').text('Thanks for your application!');
        
        // Получаем текущий URL для current_page
        $('#current_page').val(window.location.pathname + window.location.search);
        
        grecaptcha.ready(function() {
            grecaptcha.execute('6LdNyxkrAAAAACYOpKPWUv7vl7Pv-OWFP4g-qbVC', {action: 'submit'}).then(function(token) {
                var formData = new FormData($form[0]);
                formData.append('recaptcha_token', token);
                
                $.ajax({
                    url: $form.attr('action'),
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: 'json',
                    success: function(data) {
                        if (data.status === 'success') {
                            $form.trigger("reset");
                            $successNote.css('color', '#38c14c').fadeIn();
                            
                            // Автоскрытие через 5 секунд
                            setTimeout(function() {
                                $successNote.fadeOut();
                            }, 5000);
                        } else {
                            showError(data.message || 'Unknown error');
                        }
                    },
                    error: function(xhr) {
                        showError(xhr.responseJSON?.message || 'Server error');
                    }
                });
            }).catch(function() {
                showError('CAPTCHA error');
            });
            
            function showError(message) {
                $successNote.text(message)
                           .css('color', '#ff0000')
                           .addClass('error')
                           .fadeIn();
            }
        });
    });
});
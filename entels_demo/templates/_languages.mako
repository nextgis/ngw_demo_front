<%
    languages = [
        ('ru', u'Русский'),
        ('en', u'English')
    ]

    current_route_name = 'entels_map' if request.matched_route.name == 'entels_map_default' else request.matched_route.name

%>

<div class="lang-selector">
    <div class="collapsed">

    </div>
    <div class="opened">
        %for language, lang_name in languages:
            <a href="${request.route_url(current_route_name, lang=language)}"
                %if language == lang:
                   class="selected"
                %endif
                    >${lang_name}</a>
        %endfor
    </div>
</div>
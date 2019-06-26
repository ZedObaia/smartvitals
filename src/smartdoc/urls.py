from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path, re_path
from django.views.generic import RedirectView

from monitor.views import PatientDetailUpdate, PatientList, index, PatientHistoryList

urlpatterns = [
    path('api/patients/', PatientList.as_view()),
    path('api/patients/<int:pk>/', PatientDetailUpdate.as_view()),
    path('api/patients/<int:pk>/history/', PatientHistoryList.as_view()),

    path('accounts/login/', LoginView.as_view()),
    path('accounts/logout/', LogoutView.as_view()),
    path('admin/', admin.site.urls),
    re_path(r'^favicon\.ico$', RedirectView.as_view(url='/static/favicon.png')),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
urlpatterns += [
    re_path(r'(?P<path>.*)', index, name="app",)
]

from django.core.management.base import BaseCommand
from django.utils import timezone
from django.conf import settings
import subprocess
import os


class Command(BaseCommand):
    help = 'Manage vue apps from django'

    def add_arguments(self, parser):
        parser.add_argument('-c', '--create', action='store_true',
                            help='Create vue app vie vue cli')
        parser.add_argument('-s', '--serve', action='store_true',
                            help='run development server')
        parser.add_argument('-i', '--install', action='store_true',
                            help='run npm install')
        parser.add_argument('-b', '--build', action='store_true',
                            help='build for production')
        parser.add_argument('--cli', type=str, nargs='*', default="",
                help='run other vue commands')

    def handle(self, *args, **kwargs):
        # Arguments
        create = kwargs['create']
        serve = kwargs['serve']
        install = kwargs['install']
        build = kwargs['build']
        cli = kwargs['cli']
        # Base DIRs
        BASE_DIR = settings.BASE_DIR
        FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
        DIST_DIR = os.path.join(FRONTEND_DIR, "dist")
        if create:
            if os.path.isdir(FRONTEND_DIR):
                if self.query_yes_no("{} dir already exists and will be replaced, are you sure?".format(
                    self.style.WARNING(os.path.basename(FRONTEND_DIR)))):

                        self.stdout.write("%s" % "Creating new vue project ..")
                        os.chdir(BASE_DIR)
                        p = subprocess.Popen(['vue', 'create', "frontend"])
                        p.communicate()
                        if p.returncode == 0:
                            self.stdout.write(self.style.SUCCESS("Success!"))
                        else:
                            self.stdout.write(self.style.ERROR("Failed!"))
                else:
                    self.stdout.write("Okay then, I'm outta here")
            else:
                self.stdout.write("%s" % "Creating new vue project ..")
                os.chdir(BASE_DIR)
                p = subprocess.Popen(['vue', 'create', "frontend"])
                p.communicate()
                if p.returncode == 0:
                    self.stdout.write(self.style.SUCCESS("Success!"))
                else:
                    self.stdout.write(self.style.ERROR("Failed!"))

        elif serve:
            self.stdout.write("%s" % "Startig development server ..")
            os.chdir(FRONTEND_DIR)
            p = subprocess.Popen(['npm', 'run', "serve"])
            p.communicate()
            if p.returncode == 0:
                self.stdout.write(self.style.SUCCESS("Success!"))
            else:
                self.stdout.write(self.style.ERROR("Failed!"))

        elif install:
            self.stdout.write("%s" % "Installing packages ..")
            os.chdir(FRONTEND_DIR)
            p = subprocess.Popen(['npm', 'install'])
            p.communicate()
            if p.returncode == 0:
                self.stdout.write(self.style.SUCCESS("Success!"))
            else:
                self.stdout.write(self.style.ERROR("Failed!"))

        elif build:
            self.stdout.write("%s" % self.style.SUCCESS("Building for production .."))
            os.chdir(FRONTEND_DIR)
            p = subprocess.Popen(['npm', 'run', 'build'])
            p.communicate()
            if p.returncode == 0:
                self.stdout.write(self.style.SUCCESS("Success!"))
            else:
                self.stdout.write(self.style.ERROR("Failed!"))
            if DIST_DIR and os.path.exists(DIST_DIR):
                for subdir, dirs, files in os.walk(DIST_DIR):
                    subdirectoryPath = os.path.join(DIST_DIR, subdir)
                    for filename in files:
                        file_parts = filename.split('.')
                        new_name = None
                        if not filename.endswith('.map'):
                            new_name = file_parts[0]+'.'+file_parts[-1]
                        if new_name:
                            filePath = os.path.join(subdirectoryPath, filename)
                            newFilePath = os.path.join(subdirectoryPath, new_name)
                            os.rename(filePath, newFilePath)
                self.stdout.write(self.style.SUCCESS("build complete"))

            else:
                self.stdout.write(self.style.ERROR("dist dir can not be found, make sure build is complete"))
        elif cli:
            command = " ".join(cli)
            self.stdout.write("%s" % "Running : {}".format(self.style.HTTP_NOT_MODIFIED(command)))
            os.chdir(FRONTEND_DIR)
            p = subprocess.Popen(cli)
            p.communicate()
            if p.returncode == 0:
                self.stdout.write(self.style.SUCCESS("Success!"))
            else:
                self.stdout.write(self.style.ERROR("Failed!"))
    
    def query_yes_no(self, question, default="no"):
        valid = {"yes": True, "y": True, "ye": True,
                "no": False, "n": False}
        if default is None:
            prompt = " [y/n] "
        elif default == "yes":
            prompt = " [{}/{}] ".format(self.style.SUCCESS('Y'), self.style.ERROR('n'))
        elif default == "no":
            prompt = " [{}/{}] ".format(self.style.ERROR('y'), self.style.SUCCESS('N'))
        else:
            raise ValueError("invalid default answer: '%s'" % default)

        while True:
            self.stdout.write(question+prompt)
            choice = input().lower()
            if default is not None and choice == '':
                return valid[default]
            elif choice in valid:
                return valid[choice]
            else:
                self.stdout.write(self.style.HTTP_NOT_MODIFIED("Please respond with 'yes' or 'no' "
                                "(or 'y' or 'n')."))

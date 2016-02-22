from setuptools import setup, find_packages
import os

version = '0.1.dev0'
long_description = ''

if os.path.exists("README.rst"):
    long_description = open("README.rst").read()
    long_description += '\n\n' + open("docs/INSTALL.rst").read()
    long_description += '\n\n' + open("docs/USAGE.rst").read()
    long_description += '\n\n' + open("docs/CHANGES.rst").read()

setup(name='adi.reflecto',
      version=version,
      description='A file-browser-UI for the Plone-addon "Products.Reflecto".',
      long_description=long_description,
      classifiers=[
        "Framework :: Plone",
        "Programming Language :: Python",
        ],
      keywords='',
      author='Ida Ebkes',
      author_email='contact@ida-ebkes.eu',
      url='https://github.com/collective/ida/adi.reflecto',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['adi'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'plone.api',
          'setuptools',
          'Products.Reflecto',
      ],
      entry_points="""
      # -*- Entry points: -*-

      [z3c.autoinclude.plugin]
      target = plone
      """,
      )

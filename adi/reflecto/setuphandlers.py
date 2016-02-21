from plone import api

from Products.CMFCore.utils import getToolByName


def doOnInstall(context):
    # Put your code, to be executed on an install, here.
    # If you want this to happen only on the initial, very first install,
    # uncomment the next lines:
#    qi = getToolByName(context, 'portal_quickinstaller')
#    prods = qi.listInstallableProducts(skipInstalled=False)
#    for prod in prods:
#        if (prod['id'] == 'adi.reflecto') and (prod['status'] == 'uninstalled'):
    portal = api.portal.get()
    api.content.create(type='Reflector', title='Reflector', container=portal)
    reflector = portal['reflector']
    reflector.manage_addProperty('layout', 'adi_reflecto_main_view', 'string')
    reflector.setLife(True)
    reflector.setRelativePath('../..')

def setupVarious(context):
    portal = context.getSite()
    # The text-file is a flag, the following will only be excecuted, if it's present in an imported profile:
    if context.readDataFile('adi.reflecto.marker.txt') is None:
        return

    doOnInstall(portal)

package org.vaadin.johannest;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;

/**
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 */
@PWA(name = "ts-games", shortName = "ts-games", enableInstallPrompt = false)
public class AppShell implements AppShellConfigurator {
}

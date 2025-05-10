import { StyleSheet, View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { ChevronRight, Bell, Moon, Lock, HelpCircle, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle,
    hasSwitch,
    switchValue,
    onSwitchChange 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
  }) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#e2e8f0', true: '#0f766e' }}
        />
      ) : (
        <ChevronRight size={20} color="#64748b" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences</Text>
        <SettingItem
          icon={<Bell size={24} color="#64748b" />}
          title="Notifications"
          subtitle="Gérer les notifications"
          hasSwitch
          switchValue={notifications}
          onSwitchChange={setNotifications}
        />
        <SettingItem
          icon={<Moon size={24} color="#64748b" />}
          title="Mode sombre"
          hasSwitch
          switchValue={darkMode}
          onSwitchChange={setDarkMode}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sécurité</Text>
        <SettingItem
          icon={<Lock size={24} color="#64748b" />}
          title="Mot de passe"
          subtitle="Modifier votre mot de passe"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingItem
          icon={<HelpCircle size={24} color="#64748b" />}
          title="Aide"
          subtitle="FAQ et support"
        />
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={20} color="#dc2626" />
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '500',
  },
});
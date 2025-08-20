import { PermissionsMatrix } from './permissions-matrix';
import { SettingsSection } from './settings-section';
import { SettingsCard } from './settings-card';

export function PermissionsTab() {
  return (
    <div className="space-y-8 p-6">
      <SettingsSection
        title="Permission Matrix"
        description="Configure detailed permissions for each role"
      >
        <SettingsCard>
          <PermissionsMatrix />
        </SettingsCard>
      </SettingsSection>
    </div>
  );
}
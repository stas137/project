import { Story } from '@storybook/react';

import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';

// import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const FeatureFlagsDecorator =
  (feature: FeatureFlags) => (StoryComponent: Story) => {
    setFeatureFlags({ ...getAllFeatureFlags(), ...feature });

    return <StoryComponent />;
  };

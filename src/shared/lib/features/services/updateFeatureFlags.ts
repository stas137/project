import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<
  void,
  UpdateFeatureFlagOptions,
  ThunkConfig<string>
>('user/updateFeatureFlags', async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;

  const features = getAllFeatureFlags();

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: {
          ...features,
          ...newFeatures,
        },
      }),
    );

    window.location.reload();
  } catch (err) {
    console.log(err);
    rejectWithValue('Error');
  }
});

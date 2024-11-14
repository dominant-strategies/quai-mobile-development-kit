import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/src/components/bottomSheetBackdrop/types';
import { useTheme } from 'src/shared/context/themeContext';

type BottomSheetModalComponentProps = {
  children: React.ReactNode;
};
export const BottomSheetModalComponent = forwardRef<
  BottomSheetModal,
  BottomSheetModalComponentProps
>(({ children }, ref) => {
  const { theme } = useTheme();
  const snapPoints = useMemo(() => ['85%'], []);
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: theme.surface }}
    >
      {children}
    </BottomSheetModal>
  );
});

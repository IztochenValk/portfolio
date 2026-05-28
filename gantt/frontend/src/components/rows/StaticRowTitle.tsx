import { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

type StaticRowTitleProps = {
  title: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
};

export default function StaticRowTitle({
  title,
  rightSlot,
  className,
}: StaticRowTitleProps) {
  return (
    <Stack
      className={className}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 1, py: 0.75, minHeight: 40, gap: 1 }}
    >
      <Typography
        variant="body2"
        fontWeight={600}
        noWrap
        title={typeof title === "string" ? title : undefined}
        sx={{ minWidth: 0, flex: 1 }}
      >
        {title}
      </Typography>
      {rightSlot}
    </Stack>
  );
}

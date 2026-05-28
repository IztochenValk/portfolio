// TimeZoneSelector.tsx
import * as React from "react";
import {
  Autocomplete,
  TextField,
  Box,
  ListSubheader,
  Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  value: string;
  onChange: (tz: string) => void;
  label?: string;
  fullWidth?: boolean;
  sx?: any;
};

type TZOption = {
  id: string;        // "Europe/Paris"
  region: string;    // "Europe"
  city: string;      // "Paris"
  offset: string;    // "UTC+01:00"
  now: string;       // "14:35"
};

const FALLBACK = [
  "UTC","Europe/Paris","Europe/London","Europe/Berlin","America/New_York",
  "America/Sao_Paulo","America/Los_Angeles","Asia/Tokyo","Asia/Singapore"
];

function getOffsetLabel(tz: string, d: Date) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "shortOffset",
      hour: "2-digit"
    }).formatToParts(d);
    const raw = parts.find(p => p.type === "timeZoneName")?.value || "UTC";
    return raw.replace("GMT", "UTC");
  } catch {
    return "UTC";
  }
}

function buildOptions(): TZOption[] {
  const zones =
    // @ts-ignore
    (Intl.supportedValuesOf?.("timeZone") as string[]) || FALLBACK;

  const now = new Date();
  return zones
    .map((z) => {
      const [region, ...rest] = z.split("/");
      const city = (rest.join(" / ") || region).replace(/_/g, " ");
      const offset = getOffsetLabel(z, now);
      const nowStr = new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: z
      }).format(now);
      return { id: z, region, city, offset, now: nowStr };
    })
    .sort(
      (a, b) =>
        a.region.localeCompare(b.region) ||
        a.city.localeCompare(b.city) ||
        a.id.localeCompare(b.id)
    );
}

export default function TimeZoneSelector({
  value,
  onChange,
  label = "Fuseau horaire",
  fullWidth = false,
  sx
}: Props) {
  const options = React.useMemo(buildOptions, []);
  const selected =
    options.find((o) => o.id === value) || null;

  return (
    <Autocomplete<TZOption>
      options={options}
      groupBy={(o) => o.region}
      value={selected}
      onChange={(_, opt) => opt && onChange(opt.id)}
      getOptionLabel={(o) => o.id}
      disableClearable
      sx={{ width: fullWidth ? "100%" : 360, ...sx }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            )
          }}
        />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <ListSubheader
            component="div"
            sx={{ position: "sticky", top: 0, bgcolor: "background.paper", fontWeight: 600 }}
          >
            {params.group}
          </ListSubheader>
          <ul style={{ paddingLeft: 0, margin: 0 }}>{params.children}</ul>
        </li>
      )}
      renderOption={(props, o) => (
        <Box component="li" {...props} sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "space-between", width: "100%" }}>
            <Typography variant="body2">{o.city}</Typography>
            <Typography variant="caption" color="text.secondary">
              {o.offset} · {o.now}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">{o.id}</Typography>
        </Box>
      )}
    />
  );
}

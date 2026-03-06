// ============================================================
// Returns show config from Google Sheets, falling back to the
// static data/config.ts if Sheets isn't configured or fails.
// Same shape as SHOW_CONFIG so pages need minimal changes.
// ============================================================
import { getConfig, getSchedule } from "./sheets";
import { SHOW_CONFIG } from "@/data/config";

export type PublicConfig = typeof SHOW_CONFIG;

export async function getPublicConfig(): Promise<PublicConfig> {
  if (!process.env.GOOGLE_SHEETS_ID) return SHOW_CONFIG;

  try {
    const [config, schedule] = await Promise.all([getConfig(), getSchedule()]);

    return {
      showName:               config.showName               || SHOW_CONFIG.showName,
      tagline:                config.tagline                || SHOW_CONFIG.tagline,
      nextShowName:           config.nextShowName           || SHOW_CONFIG.nextShowName,
      startDate:              config.startDate              || SHOW_CONFIG.startDate,
      endDate:                config.endDate                || SHOW_CONFIG.endDate,
      schedule:               schedule.length > 0 ? schedule : SHOW_CONFIG.schedule,
      venueName:              config.venueName              || SHOW_CONFIG.venueName,
      venueAddress:           config.venueAddress           || SHOW_CONFIG.venueAddress,
      venueCity:              config.venueCity              || SHOW_CONFIG.venueCity,
      venueFullAddress:       config.venueFullAddress       || SHOW_CONFIG.venueFullAddress,
      googleMapsEmbedUrl:     config.googleMapsEmbedUrl     || SHOW_CONFIG.googleMapsEmbedUrl,
      googleMapsDirectionsUrl:config.googleMapsDirectionsUrl|| SHOW_CONFIG.googleMapsDirectionsUrl,
      admissionEarlyBird:     config.admissionEarlyBird     ?? SHOW_CONFIG.admissionEarlyBird,
      admissionEarlyBirdNote: config.admissionEarlyBirdNote ?? SHOW_CONFIG.admissionEarlyBirdNote,
      admissionAdult:         config.admissionAdult         || SHOW_CONFIG.admissionAdult,
      admissionAdultNote:     config.admissionAdultNote     || SHOW_CONFIG.admissionAdultNote,
      admissionYouth:         config.admissionYouth         || SHOW_CONFIG.admissionYouth,
      admissionYouthNote:     config.admissionYouthNote     || SHOW_CONFIG.admissionYouthNote,
      admissionMilitary:      config.admissionMilitary      || SHOW_CONFIG.admissionMilitary,
      admissionMilitaryNote:  config.admissionMilitaryNote  || SHOW_CONFIG.admissionMilitaryNote,
      parkingNote:            config.parkingNote            || SHOW_CONFIG.parkingNote,
      yearEstablished:        config.yearEstablished ? parseInt(config.yearEstablished) : SHOW_CONFIG.yearEstablished,
      dealerCount:            config.dealerCount            || SHOW_CONFIG.dealerCount,
      attendeesPerShow:       config.attendeesPerShow       || SHOW_CONFIG.attendeesPerShow,
      contactEmail:           config.contactEmail           || SHOW_CONFIG.contactEmail,
      contactPhone:           config.contactPhone           || SHOW_CONFIG.contactPhone,
      raffleTicketPrice:      config.raffleTicketPrice      || SHOW_CONFIG.raffleTicketPrice,
      raffleDrawingTimes:     config.raffleDrawingTimes
        ? config.raffleDrawingTimes.split(",").map((s) => s.trim())
        : SHOW_CONFIG.raffleDrawingTimes,
      raffleMustBePresent:    config.raffleMustBePresent !== undefined
        ? config.raffleMustBePresent === "true"
        : SHOW_CONFIG.raffleMustBePresent,
    };
  } catch {
    return SHOW_CONFIG;
  }
}

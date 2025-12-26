import { UrlSafeEncoderService } from './services/url-safe-encoder.service.js';
import { ParticipantsFormComponent } from './components/participants-form/participants-form.component.js';
import { ParticipantsListComponent } from './components/participants-list/participants-list.component.js';
import { ParticipantsInfoComponent } from './components/participants-info/participants-info.component.js';
import { ParticipantsRepository } from './repositories/participants.repository.js';
import { GiftPairsFormComponent } from './components/gift-pairs-form/gift-pairs-form.components.js';
import { GiftPairsListComponent } from './components/gift-pairs-list/gift-pairs-list.component.js';
import { addMockParticipants } from './repositories/participants.mock.js';
import { GiftPairsService } from './services/gift-pairs.service.js';

const participantsRepository = new ParticipantsRepository({ emit: true });

const urlSafeEncoderService = new UrlSafeEncoderService();
const giftPairsService = new GiftPairsService({
	urlSafeEncoderService,
	participantsRepository,
});

new ParticipantsFormComponent({ participantsRepository });
new ParticipantsListComponent({ participantsRepository });
new ParticipantsInfoComponent({ participantsRepository });
new GiftPairsFormComponent({ giftPairsService, participantsRepository });
new GiftPairsListComponent({ giftPairsService });

// addMockParticipants(participantsRepository);

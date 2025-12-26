import { DrawFormComponent } from './components/draw-form.component.js';
import { DrawListComponent } from './components/draw-list.component.js';
import { ParticipantsFormComponent } from './components/participants-form.component.js';
import { ParticipantsInfoComponent } from './components/participants-info.component.js';
import { ParticipantsListComponent } from './components/participants-list.component.js';
import { ParticipantsRepository } from './repositories/participants.repository.js';
import { DrawService } from './services/draw.service.js';
import { UrlSafeEncodingService } from './services/url-safe-encoding.service.js';

const participantsRepository = new ParticipantsRepository({ emit: true });

const urlSafeEncodingService = new UrlSafeEncodingService();
const drawService = new DrawService({
	urlSafeEncodingService,
	participantsRepository,
});

document.addEventListener('DOMContentLoaded', () => {
	participantsRepository.loadFromLocalStorage();
});

new ParticipantsFormComponent({ participantsRepository });
new ParticipantsListComponent({ participantsRepository });
new ParticipantsInfoComponent({ participantsRepository });
new DrawFormComponent({ drawService, participantsRepository });
new DrawListComponent({ drawService });

// Fallback vocabulary data when OpenAI API is not available
export interface VocabWord {
  word: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
  collocations: string[];
  cefrLevel: string;
}

export const VOCABULARY_BANK: VocabWord[] = [
  // A1 Words
  { word: 'hello', partOfSpeech: 'interjection', meaning: 'a greeting used when meeting someone', example: 'Hello! How are you today?', collocations: ['say hello', 'hello there', 'hello everyone'], cefrLevel: 'A1' },
  { word: 'house', partOfSpeech: 'noun', meaning: 'a building where people live', example: 'They live in a big house near the park.', collocations: ['big house', 'house number', 'at the house'], cefrLevel: 'A1' },
  { word: 'happy', partOfSpeech: 'adjective', meaning: 'feeling or showing pleasure', example: 'She is very happy today because it is her birthday.', collocations: ['feel happy', 'happy birthday', 'happy ending'], cefrLevel: 'A1' },
  { word: 'eat', partOfSpeech: 'verb', meaning: 'to put food in your mouth and swallow it', example: 'I eat breakfast every morning at 8 o\'clock.', collocations: ['eat breakfast', 'eat lunch', 'eat dinner'], cefrLevel: 'A1' },
  { word: 'water', partOfSpeech: 'noun', meaning: 'a clear liquid that falls as rain', example: 'Can I have a glass of water, please?', collocations: ['drink water', 'cold water', 'water bottle'], cefrLevel: 'A1' },
  { word: 'family', partOfSpeech: 'noun', meaning: 'a group of people related to each other', example: 'My family has five members.', collocations: ['family member', 'family name', 'big family'], cefrLevel: 'A1' },
  { word: 'work', partOfSpeech: 'verb', meaning: 'to do an activity that needs effort', example: 'I work in an office from Monday to Friday.', collocations: ['go to work', 'hard work', 'work together'], cefrLevel: 'A1' },
  { word: 'friend', partOfSpeech: 'noun', meaning: 'a person you like and enjoy being with', example: 'She is my best friend from school.', collocations: ['best friend', 'old friend', 'make friends'], cefrLevel: 'A1' },

  // A2 Words
  { word: 'comfortable', partOfSpeech: 'adjective', meaning: 'giving a feeling of physical ease', example: 'This chair is very comfortable to sit in.', collocations: ['comfortable chair', 'feel comfortable', 'comfortable clothes'], cefrLevel: 'A2' },
  { word: 'dangerous', partOfSpeech: 'adjective', meaning: 'able to cause harm or injury', example: 'Swimming in the river can be dangerous.', collocations: ['dangerous situation', 'very dangerous', 'dangerous road'], cefrLevel: 'A2' },
  { word: 'explain', partOfSpeech: 'verb', meaning: 'to make something clear or easy to understand', example: 'Can you explain how this works?', collocations: ['explain clearly', 'explain the rules', 'explain why'], cefrLevel: 'A2' },
  { word: 'improve', partOfSpeech: 'verb', meaning: 'to make or become better', example: 'She wants to improve her English skills.', collocations: ['improve skills', 'improve performance', 'greatly improve'], cefrLevel: 'A2' },
  { word: 'adventure', partOfSpeech: 'noun', meaning: 'an exciting or unusual experience', example: 'Going to Africa was a great adventure.', collocations: ['great adventure', 'adventure story', 'adventure travel'], cefrLevel: 'A2' },
  { word: 'celebrate', partOfSpeech: 'verb', meaning: 'to do something special for an important event', example: 'We celebrate New Year with fireworks.', collocations: ['celebrate birthday', 'celebrate success', 'celebrate together'], cefrLevel: 'A2' },
  { word: 'recipe', partOfSpeech: 'noun', meaning: 'instructions for preparing a particular dish', example: 'I found a great recipe for chocolate cake.', collocations: ['follow a recipe', 'simple recipe', 'recipe book'], cefrLevel: 'A2' },
  { word: 'journey', partOfSpeech: 'noun', meaning: 'an act of traveling from one place to another', example: 'The journey to Paris takes about two hours by train.', collocations: ['long journey', 'safe journey', 'journey home'], cefrLevel: 'A2' },

  // B1 Words
  { word: 'achieve', partOfSpeech: 'verb', meaning: 'to successfully reach a goal through effort', example: 'She worked hard to achieve her dream of becoming a doctor.', collocations: ['achieve success', 'achieve a goal', 'achieve results'], cefrLevel: 'B1' },
  { word: 'consequence', partOfSpeech: 'noun', meaning: 'a result or effect of an action', example: 'One consequence of pollution is climate change.', collocations: ['face consequences', 'serious consequence', 'natural consequence'], cefrLevel: 'B1' },
  { word: 'opportunity', partOfSpeech: 'noun', meaning: 'a chance for progress or advancement', example: 'This job offers a great opportunity for career growth.', collocations: ['great opportunity', 'take the opportunity', 'miss an opportunity'], cefrLevel: 'B1' },
  { word: 'persuade', partOfSpeech: 'verb', meaning: 'to convince someone to do something', example: 'He persuaded his parents to let him study abroad.', collocations: ['persuade someone', 'hard to persuade', 'persuade to buy'], cefrLevel: 'B1' },
  { word: 'responsible', partOfSpeech: 'adjective', meaning: 'having a duty to deal with something', example: 'She is responsible for managing the team.', collocations: ['responsible for', 'responsible person', 'socially responsible'], cefrLevel: 'B1' },
  { word: 'environment', partOfSpeech: 'noun', meaning: 'the surroundings or conditions in which a person lives', example: 'We should protect the environment for future generations.', collocations: ['natural environment', 'protect the environment', 'work environment'], cefrLevel: 'B1' },
  { word: 'significant', partOfSpeech: 'adjective', meaning: 'important or large enough to have an effect', example: 'There has been a significant increase in sales this year.', collocations: ['significant change', 'significant impact', 'significant difference'], cefrLevel: 'B1' },
  { word: 'recommend', partOfSpeech: 'verb', meaning: 'to suggest something as good or suitable', example: 'I would recommend this restaurant to anyone.', collocations: ['highly recommend', 'recommend a book', 'recommend strongly'], cefrLevel: 'B1' },

  // B2 Words
  { word: 'acquisition', partOfSpeech: 'noun', meaning: 'the process of gaining something', example: 'Language acquisition is faster for young children.', collocations: ['language acquisition', 'data acquisition', 'knowledge acquisition'], cefrLevel: 'B2' },
  { word: 'comprehensive', partOfSpeech: 'adjective', meaning: 'including everything that is necessary', example: 'The report provides a comprehensive analysis of the market.', collocations: ['comprehensive study', 'comprehensive review', 'comprehensive plan'], cefrLevel: 'B2' },
  { word: 'distinguish', partOfSpeech: 'verb', meaning: 'to recognize or treat as different', example: 'It is important to distinguish between facts and opinions.', collocations: ['distinguish between', 'distinguish from', 'easily distinguish'], cefrLevel: 'B2' },
  { word: 'inevitable', partOfSpeech: 'adjective', meaning: 'certain to happen and unable to be avoided', example: 'Change is inevitable in any growing organization.', collocations: ['inevitable result', 'inevitable change', 'seem inevitable'], cefrLevel: 'B2' },
  { word: 'controversy', partOfSpeech: 'noun', meaning: 'prolonged public disagreement or heated discussion', example: 'The new policy caused a lot of controversy.', collocations: ['cause controversy', 'political controversy', 'avoid controversy'], cefrLevel: 'B2' },
  { word: 'emphasize', partOfSpeech: 'verb', meaning: 'to give special importance to something', example: 'The teacher emphasized the importance of practice.', collocations: ['emphasize importance', 'strongly emphasize', 'emphasize the need'], cefrLevel: 'B2' },
  { word: 'fluctuate', partOfSpeech: 'verb', meaning: 'to change frequently in size, amount, or quality', example: 'Oil prices fluctuate depending on global demand.', collocations: ['prices fluctuate', 'fluctuate widely', 'fluctuate between'], cefrLevel: 'B2' },
  { word: 'phenomenon', partOfSpeech: 'noun', meaning: 'a fact or situation that is observed to exist', example: 'Global warming is a well-documented phenomenon.', collocations: ['natural phenomenon', 'social phenomenon', 'cultural phenomenon'], cefrLevel: 'B2' },

  // C1 Words
  { word: 'ambiguous', partOfSpeech: 'adjective', meaning: 'open to more than one interpretation', example: 'The contract language was deliberately ambiguous.', collocations: ['ambiguous meaning', 'deliberately ambiguous', 'ambiguous statement'], cefrLevel: 'C1' },
  { word: 'consolidate', partOfSpeech: 'verb', meaning: 'to combine things to make them more effective', example: 'The company consolidated its operations in one city.', collocations: ['consolidate power', 'consolidate position', 'consolidate gains'], cefrLevel: 'C1' },
  { word: 'deteriorate', partOfSpeech: 'verb', meaning: 'to become progressively worse', example: 'His health began to deteriorate rapidly.', collocations: ['health deteriorate', 'conditions deteriorate', 'rapidly deteriorate'], cefrLevel: 'C1' },
  { word: 'unprecedented', partOfSpeech: 'adjective', meaning: 'never done or known before', example: 'The pandemic caused unprecedented disruption worldwide.', collocations: ['unprecedented scale', 'unprecedented growth', 'unprecedented challenge'], cefrLevel: 'C1' },
  { word: 'superficial', partOfSpeech: 'adjective', meaning: 'existing or occurring at or on the surface; not deep', example: 'His analysis was superficial and lacked depth.', collocations: ['superficial analysis', 'superficial wound', 'superficial knowledge'], cefrLevel: 'C1' },
  { word: 'paradox', partOfSpeech: 'noun', meaning: 'a seemingly contradictory statement that may be true', example: 'It is a paradox that technology connects yet isolates us.', collocations: ['apparent paradox', 'paradox of choice', 'interesting paradox'], cefrLevel: 'C1' },
  { word: 'juxtapose', partOfSpeech: 'verb', meaning: 'to place close together for contrasting effect', example: 'The artist juxtaposed modern and classical elements.', collocations: ['juxtapose ideas', 'juxtapose images', 'sharply juxtaposed'], cefrLevel: 'C1' },
  { word: 'substantiate', partOfSpeech: 'verb', meaning: 'to provide evidence to support a claim', example: 'She was unable to substantiate her allegations.', collocations: ['substantiate claims', 'substantiate evidence', 'fail to substantiate'], cefrLevel: 'C1' },

  // C2 Words
  { word: 'quintessential', partOfSpeech: 'adjective', meaning: 'representing the most perfect example of something', example: 'She is the quintessential modern entrepreneur.', collocations: ['quintessential example', 'quintessential British', 'quintessential experience'], cefrLevel: 'C2' },
  { word: 'ubiquitous', partOfSpeech: 'adjective', meaning: 'present, appearing, or found everywhere', example: 'Smartphones have become ubiquitous in modern society.', collocations: ['ubiquitous presence', 'ubiquitous technology', 'become ubiquitous'], cefrLevel: 'C2' },
  { word: 'perfunctory', partOfSpeech: 'adjective', meaning: 'carried out with minimum effort or thought', example: 'He gave a perfunctory nod and continued working.', collocations: ['perfunctory glance', 'perfunctory greeting', 'perfunctory manner'], cefrLevel: 'C2' },
  { word: 'ephemeral', partOfSpeech: 'adjective', meaning: 'lasting for a very short time', example: 'Fame can be ephemeral, disappearing as quickly as it comes.', collocations: ['ephemeral nature', 'ephemeral beauty', 'ephemeral moment'], cefrLevel: 'C2' },
  { word: 'surreptitious', partOfSpeech: 'adjective', meaning: 'kept secret, especially because of disapproval', example: 'She cast a surreptitious glance at her phone during the meeting.', collocations: ['surreptitious glance', 'surreptitious manner', 'surreptitious activity'], cefrLevel: 'C2' },
  { word: 'inexorable', partOfSpeech: 'adjective', meaning: 'impossible to stop or prevent', example: 'The inexorable march of technology changes everything.', collocations: ['inexorable rise', 'inexorable decline', 'inexorable march'], cefrLevel: 'C2' },
  { word: 'recalcitrant', partOfSpeech: 'adjective', meaning: 'having an uncooperative attitude', example: 'The recalcitrant student refused to follow the rules.', collocations: ['recalcitrant attitude', 'recalcitrant behavior', 'recalcitrant child'], cefrLevel: 'C2' },
  { word: 'perspicacious', partOfSpeech: 'adjective', meaning: 'having a ready insight into and understanding of things', example: 'Her perspicacious analysis impressed the board.', collocations: ['perspicacious observer', 'perspicacious analysis', 'perspicacious reader'], cefrLevel: 'C2' },
];

// Placement test questions bank
export interface PlacementQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  cefrLevel: string;
  type: 'meaning' | 'completion' | 'usage';
}

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // A1 Questions
  { question: 'What does "big" mean?', options: ['Small', 'Large', 'Fast', 'Slow'], correctAnswer: 1, cefrLevel: 'A1', type: 'meaning' },
  { question: 'I ___ to school every day.', options: ['go', 'going', 'goes', 'gone'], correctAnswer: 0, cefrLevel: 'A1', type: 'completion' },
  { question: 'She ___ a student.', options: ['am', 'is', 'are', 'be'], correctAnswer: 1, cefrLevel: 'A1', type: 'completion' },

  // A2 Questions
  { question: 'What does "comfortable" mean?', options: ['Difficult to use', 'Easy and relaxing', 'Very expensive', 'Extremely fast'], correctAnswer: 1, cefrLevel: 'A2', type: 'meaning' },
  { question: 'I have been living here ___ 2015.', options: ['for', 'since', 'during', 'while'], correctAnswer: 1, cefrLevel: 'A2', type: 'completion' },
  { question: 'Which sentence uses "journey" correctly?', options: ['I journey my homework.', 'The journey to London was long.', 'She journey the cake.', 'They journey happy.'], correctAnswer: 1, cefrLevel: 'A2', type: 'usage' },

  // B1 Questions
  { question: 'What does "consequence" mean?', options: ['A type of food', 'A result or effect', 'A musical instrument', 'A building material'], correctAnswer: 1, cefrLevel: 'B1', type: 'meaning' },
  { question: 'If I ___ more money, I would travel the world.', options: ['have', 'had', 'having', 'has'], correctAnswer: 1, cefrLevel: 'B1', type: 'completion' },
  { question: 'He finally ___ his goal after years of work.', options: ['achieved', 'received', 'provided', 'followed'], correctAnswer: 0, cefrLevel: 'B1', type: 'usage' },
  { question: 'I wish I ___ speak French fluently.', options: ['can', 'could', 'will', 'should'], correctAnswer: 1, cefrLevel: 'B1', type: 'completion' },

  // B2 Questions
  { question: 'What does "comprehensive" mean?', options: ['Difficult to read', 'Including everything needed', 'Very old fashioned', 'Related to competition'], correctAnswer: 1, cefrLevel: 'B2', type: 'meaning' },
  { question: 'The prices ___ depending on the season.', options: ['fluctuate', 'fabricate', 'facilitate', 'formulate'], correctAnswer: 0, cefrLevel: 'B2', type: 'completion' },
  { question: 'It is important to ___ between correlation and causation.', options: ['distribute', 'distinguish', 'diminish', 'discharge'], correctAnswer: 1, cefrLevel: 'B2', type: 'usage' },
  { question: 'The decision was ___, given the circumstances.', options: ['inevitable', 'invisible', 'invincible', 'invaluable'], correctAnswer: 0, cefrLevel: 'B2', type: 'completion' },

  // C1 Questions
  { question: 'What does "unprecedented" mean?', options: ['Carefully planned', 'Never known before', 'Completely understood', 'Previously discussed'], correctAnswer: 1, cefrLevel: 'C1', type: 'meaning' },
  { question: 'The company ___ its operations to reduce costs.', options: ['consolidated', 'consecrated', 'confiscated', 'congregated'], correctAnswer: 0, cefrLevel: 'C1', type: 'completion' },
  { question: 'His health began to ___ after the accident.', options: ['deliberate', 'deteriorate', 'demonstrate', 'determinate'], correctAnswer: 1, cefrLevel: 'C1', type: 'usage' },

  // C2 Questions
  { question: 'What does "ubiquitous" mean?', options: ['Found everywhere', 'Extremely rare', 'Highly valued', 'Deeply hidden'], correctAnswer: 0, cefrLevel: 'C2', type: 'meaning' },
  { question: 'Her ___ observation revealed the flaw in the argument.', options: ['perfunctory', 'perspicacious', 'peremptory', 'pernicious'], correctAnswer: 1, cefrLevel: 'C2', type: 'completion' },
  { question: 'The ___ nature of fame means it rarely lasts.', options: ['ephemeral', 'eternal', 'empirical', 'eminent'], correctAnswer: 0, cefrLevel: 'C2', type: 'usage' },
];

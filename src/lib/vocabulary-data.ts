// Fallback vocabulary data when OpenAI API is not available
export interface VocabWord {
  word: string;
  partOfSpeech: string;
  meaning: string;
  meaningKo?: string;
  example: string;
  exampleKo?: string;
  collocations: string[];
  collocationsKo?: string[];
  cefrLevel: string;
}

export interface WorkbookVocabOverride {
  meaningKo: string;
  example: string;
  exampleKo: string;
  collocations: string;
}

export const VOCABULARY_BANK: VocabWord[] = [
  // ==================== A1 Words (25) ====================
  { word: 'hello', partOfSpeech: 'interjection', meaning: 'a greeting used when meeting someone', example: 'Hello! How are you today?', collocations: ['say hello', 'hello there', 'hello everyone'], cefrLevel: 'A1' },
  { word: 'house', partOfSpeech: 'noun', meaning: 'a building where people live', example: 'They live in a big house near the park.', collocations: ['big house', 'house number', 'at the house'], cefrLevel: 'A1' },
  { word: 'happy', partOfSpeech: 'adjective', meaning: 'feeling or showing pleasure', example: 'She is very happy today because it is her birthday.', collocations: ['feel happy', 'happy birthday', 'happy ending'], cefrLevel: 'A1' },
  { word: 'eat', partOfSpeech: 'verb', meaning: 'to put food in your mouth and swallow it', example: 'I eat breakfast every morning at 8 o\'clock.', collocations: ['eat breakfast', 'eat lunch', 'eat dinner'], cefrLevel: 'A1' },
  { word: 'water', partOfSpeech: 'noun', meaning: 'a clear liquid that falls as rain', example: 'Can I have a glass of water, please?', collocations: ['drink water', 'cold water', 'water bottle'], cefrLevel: 'A1' },
  { word: 'family', partOfSpeech: 'noun', meaning: 'a group of people related to each other', example: 'My family has five members.', collocations: ['family member', 'family name', 'big family'], cefrLevel: 'A1' },
  { word: 'work', partOfSpeech: 'verb', meaning: 'to do an activity that needs effort', example: 'I work in an office from Monday to Friday.', collocations: ['go to work', 'hard work', 'work together'], cefrLevel: 'A1' },
  { word: 'friend', partOfSpeech: 'noun', meaning: 'a person you like and enjoy being with', example: 'She is my best friend from school.', collocations: ['best friend', 'old friend', 'make friends'], cefrLevel: 'A1' },
  { word: 'book', partOfSpeech: 'noun', meaning: 'a set of printed pages bound together', example: 'I am reading a very interesting book.', collocations: ['read a book', 'book store', 'good book'], cefrLevel: 'A1' },
  { word: 'cold', partOfSpeech: 'adjective', meaning: 'having a low temperature', example: 'It is very cold outside today.', collocations: ['cold weather', 'cold water', 'catch a cold'], cefrLevel: 'A1' },
  { word: 'morning', partOfSpeech: 'noun', meaning: 'the early part of the day', example: 'I wake up early every morning.', collocations: ['good morning', 'this morning', 'morning coffee'], cefrLevel: 'A1' },
  { word: 'money', partOfSpeech: 'noun', meaning: 'coins or notes used to buy things', example: 'I do not have enough money to buy the shoes.', collocations: ['save money', 'spend money', 'earn money'], cefrLevel: 'A1' },
  { word: 'open', partOfSpeech: 'verb', meaning: 'to move something so it is no longer closed', example: 'Please open the door for me.', collocations: ['open the door', 'open a book', 'wide open'], cefrLevel: 'A1' },
  { word: 'car', partOfSpeech: 'noun', meaning: 'a road vehicle with an engine and four wheels', example: 'He drives a red car to work.', collocations: ['drive a car', 'new car', 'car park'], cefrLevel: 'A1' },
  { word: 'write', partOfSpeech: 'verb', meaning: 'to form letters or words on a surface', example: 'Please write your name on the paper.', collocations: ['write a letter', 'write down', 'write a story'], cefrLevel: 'A1' },
  { word: 'small', partOfSpeech: 'adjective', meaning: 'not large in size or amount', example: 'She lives in a small apartment.', collocations: ['small size', 'small town', 'small number'], cefrLevel: 'A1' },
  { word: 'school', partOfSpeech: 'noun', meaning: 'a place where children learn', example: 'The children go to school at 8 am.', collocations: ['go to school', 'school bus', 'after school'], cefrLevel: 'A1' },
  { word: 'help', partOfSpeech: 'verb', meaning: 'to make it easier for someone to do something', example: 'Can you help me carry these bags?', collocations: ['help out', 'need help', 'help with'], cefrLevel: 'A1' },
  { word: 'like', partOfSpeech: 'verb', meaning: 'to find pleasant or enjoyable', example: 'I like chocolate ice cream very much.', collocations: ['would like', 'like to', 'feel like'], cefrLevel: 'A1' },
  { word: 'today', partOfSpeech: 'adverb', meaning: 'on this present day', example: 'What are you doing today?', collocations: ['today is', 'until today', 'later today'], cefrLevel: 'A1' },
  { word: 'food', partOfSpeech: 'noun', meaning: 'things that people and animals eat', example: 'The food in this restaurant is delicious.', collocations: ['fast food', 'food and drink', 'healthy food'], cefrLevel: 'A1' },
  { word: 'play', partOfSpeech: 'verb', meaning: 'to take part in a game or activity for enjoyment', example: 'The children play in the garden after school.', collocations: ['play a game', 'play football', 'play music'], cefrLevel: 'A1' },
  { word: 'time', partOfSpeech: 'noun', meaning: 'the part of existence measured in hours and minutes', example: 'What time is it now?', collocations: ['on time', 'free time', 'a long time'], cefrLevel: 'A1' },
  { word: 'good', partOfSpeech: 'adjective', meaning: 'of a high quality or standard', example: 'This is a very good restaurant.', collocations: ['good morning', 'good idea', 'good at'], cefrLevel: 'A1' },
  { word: 'teacher', partOfSpeech: 'noun', meaning: 'a person who teaches, especially in a school', example: 'Our English teacher is very kind.', collocations: ['school teacher', 'music teacher', 'teacher training'], cefrLevel: 'A1' },

  // ==================== A2 Words (25) ====================
  { word: 'comfortable', partOfSpeech: 'adjective', meaning: 'giving a feeling of physical ease', example: 'This chair is very comfortable to sit in.', collocations: ['comfortable chair', 'feel comfortable', 'comfortable clothes'], cefrLevel: 'A2' },
  { word: 'dangerous', partOfSpeech: 'adjective', meaning: 'able to cause harm or injury', example: 'Swimming in the river can be dangerous.', collocations: ['dangerous situation', 'very dangerous', 'dangerous road'], cefrLevel: 'A2' },
  { word: 'explain', partOfSpeech: 'verb', meaning: 'to make something clear or easy to understand', example: 'Can you explain how this works?', collocations: ['explain clearly', 'explain the rules', 'explain why'], cefrLevel: 'A2' },
  { word: 'improve', partOfSpeech: 'verb', meaning: 'to make or become better', example: 'She wants to improve her English skills.', collocations: ['improve skills', 'improve performance', 'greatly improve'], cefrLevel: 'A2' },
  { word: 'adventure', partOfSpeech: 'noun', meaning: 'an exciting or unusual experience', example: 'Going to Africa was a great adventure.', collocations: ['great adventure', 'adventure story', 'adventure travel'], cefrLevel: 'A2' },
  { word: 'celebrate', partOfSpeech: 'verb', meaning: 'to do something special for an important event', example: 'We celebrate New Year with fireworks.', collocations: ['celebrate birthday', 'celebrate success', 'celebrate together'], cefrLevel: 'A2' },
  { word: 'recipe', partOfSpeech: 'noun', meaning: 'instructions for preparing a particular dish', example: 'I found a great recipe for chocolate cake.', collocations: ['follow a recipe', 'simple recipe', 'recipe book'], cefrLevel: 'A2' },
  { word: 'journey', partOfSpeech: 'noun', meaning: 'an act of traveling from one place to another', example: 'The journey to Paris takes about two hours by train.', collocations: ['long journey', 'safe journey', 'journey home'], cefrLevel: 'A2' },
  { word: 'neighbor', partOfSpeech: 'noun', meaning: 'a person living next door or near to you', example: 'Our neighbor has a friendly dog.', collocations: ['next-door neighbor', 'friendly neighbor', 'neighbor\'s house'], cefrLevel: 'A2' },
  { word: 'polite', partOfSpeech: 'adjective', meaning: 'having good manners and showing respect', example: 'It is polite to say please and thank you.', collocations: ['polite request', 'very polite', 'polite smile'], cefrLevel: 'A2' },
  { word: 'decide', partOfSpeech: 'verb', meaning: 'to choose something after thinking about it', example: 'I decided to study medicine at university.', collocations: ['decide to', 'hard to decide', 'finally decide'], cefrLevel: 'A2' },
  { word: 'important', partOfSpeech: 'adjective', meaning: 'having great value or significance', example: 'Education is very important for children.', collocations: ['most important', 'very important', 'important thing'], cefrLevel: 'A2' },
  { word: 'compare', partOfSpeech: 'verb', meaning: 'to examine how things are similar or different', example: 'Let us compare the prices of these two products.', collocations: ['compare prices', 'compare with', 'compare to'], cefrLevel: 'A2' },
  { word: 'experience', partOfSpeech: 'noun', meaning: 'something that happens to you', example: 'Living abroad was a wonderful experience.', collocations: ['work experience', 'life experience', 'learning experience'], cefrLevel: 'A2' },
  { word: 'practice', partOfSpeech: 'verb', meaning: 'to do something repeatedly to get better', example: 'You need to practice speaking English every day.', collocations: ['practice makes perfect', 'practice speaking', 'daily practice'], cefrLevel: 'A2' },
  { word: 'typical', partOfSpeech: 'adjective', meaning: 'having the usual qualities of a particular type', example: 'This is a typical English breakfast.', collocations: ['typical example', 'typical day', 'typical behavior'], cefrLevel: 'A2' },
  { word: 'mistake', partOfSpeech: 'noun', meaning: 'an action or judgment that is wrong', example: 'Everyone makes mistakes when learning a language.', collocations: ['make a mistake', 'common mistake', 'learn from mistakes'], cefrLevel: 'A2' },
  { word: 'temperature', partOfSpeech: 'noun', meaning: 'how hot or cold something is', example: 'The temperature today is 25 degrees.', collocations: ['high temperature', 'room temperature', 'body temperature'], cefrLevel: 'A2' },
  { word: 'opportunity', partOfSpeech: 'noun', meaning: 'a chance to do something', example: 'This is a great opportunity to learn something new.', collocations: ['great opportunity', 'job opportunity', 'miss an opportunity'], cefrLevel: 'A2' },
  { word: 'guess', partOfSpeech: 'verb', meaning: 'to give an answer without knowing if it is right', example: 'Can you guess the answer to this question?', collocations: ['take a guess', 'guess what', 'lucky guess'], cefrLevel: 'A2' },
  { word: 'especially', partOfSpeech: 'adverb', meaning: 'to a great extent; more than usual', example: 'I love all fruit, especially strawberries.', collocations: ['especially important', 'especially when', 'especially for'], cefrLevel: 'A2' },
  { word: 'borrow', partOfSpeech: 'verb', meaning: 'to take and use something belonging to someone else', example: 'Can I borrow your pen for a moment?', collocations: ['borrow money', 'borrow a book', 'borrow from'], cefrLevel: 'A2' },
  { word: 'belong', partOfSpeech: 'verb', meaning: 'to be the property of someone', example: 'This bag belongs to my sister.', collocations: ['belong to', 'sense of belonging', 'where it belongs'], cefrLevel: 'A2' },
  { word: 'contain', partOfSpeech: 'verb', meaning: 'to have something inside', example: 'This box contains all my old photographs.', collocations: ['contain information', 'contain water', 'contain sugar'], cefrLevel: 'A2' },
  { word: 'accident', partOfSpeech: 'noun', meaning: 'an unfortunate event that happens unexpectedly', example: 'There was a car accident on the highway this morning.', collocations: ['car accident', 'by accident', 'terrible accident'], cefrLevel: 'A2' },

  // ==================== B1 Words (25) ====================
  { word: 'achieve', partOfSpeech: 'verb', meaning: 'to successfully reach a goal through effort', example: 'She worked hard to achieve her dream of becoming a doctor.', collocations: ['achieve success', 'achieve a goal', 'achieve results'], cefrLevel: 'B1' },
  { word: 'consequence', partOfSpeech: 'noun', meaning: 'a result or effect of an action', example: 'One consequence of pollution is climate change.', collocations: ['face consequences', 'serious consequence', 'natural consequence'], cefrLevel: 'B1' },
  { word: 'persuade', partOfSpeech: 'verb', meaning: 'to convince someone to do something', example: 'He persuaded his parents to let him study abroad.', collocations: ['persuade someone', 'hard to persuade', 'persuade to buy'], cefrLevel: 'B1' },
  { word: 'responsible', partOfSpeech: 'adjective', meaning: 'having a duty to deal with something', example: 'She is responsible for managing the team.', collocations: ['responsible for', 'responsible person', 'socially responsible'], cefrLevel: 'B1' },
  { word: 'environment', partOfSpeech: 'noun', meaning: 'the surroundings or conditions in which a person lives', example: 'We should protect the environment for future generations.', collocations: ['natural environment', 'protect the environment', 'work environment'], cefrLevel: 'B1' },
  { word: 'significant', partOfSpeech: 'adjective', meaning: 'important or large enough to have an effect', example: 'There has been a significant increase in sales this year.', collocations: ['significant change', 'significant impact', 'significant difference'], cefrLevel: 'B1' },
  { word: 'recommend', partOfSpeech: 'verb', meaning: 'to suggest something as good or suitable', example: 'I would recommend this restaurant to anyone.', collocations: ['highly recommend', 'recommend a book', 'recommend strongly'], cefrLevel: 'B1' },
  { word: 'concentrate', partOfSpeech: 'verb', meaning: 'to focus all attention on a particular thing', example: 'I cannot concentrate on my work because of the noise.', collocations: ['concentrate on', 'hard to concentrate', 'concentrate fully'], cefrLevel: 'B1' },
  { word: 'attitude', partOfSpeech: 'noun', meaning: 'the way a person thinks or feels about something', example: 'A positive attitude can help you overcome challenges.', collocations: ['positive attitude', 'change attitude', 'bad attitude'], cefrLevel: 'B1' },
  { word: 'afford', partOfSpeech: 'verb', meaning: 'to have enough money to pay for something', example: 'We cannot afford to buy a new car right now.', collocations: ['can afford', 'afford to buy', 'cannot afford'], cefrLevel: 'B1' },
  { word: 'brilliant', partOfSpeech: 'adjective', meaning: 'extremely clever or talented', example: 'She is a brilliant scientist with many published papers.', collocations: ['brilliant idea', 'brilliant student', 'absolutely brilliant'], cefrLevel: 'B1' },
  { word: 'demand', partOfSpeech: 'noun', meaning: 'a strong request or need for something', example: 'There is a growing demand for online education.', collocations: ['high demand', 'meet demand', 'in demand'], cefrLevel: 'B1' },
  { word: 'establish', partOfSpeech: 'verb', meaning: 'to set up something on a permanent basis', example: 'The company was established in 1995.', collocations: ['establish a business', 'well established', 'establish contact'], cefrLevel: 'B1' },
  { word: 'generation', partOfSpeech: 'noun', meaning: 'all the people born around the same time', example: 'The younger generation uses technology differently.', collocations: ['next generation', 'younger generation', 'generation gap'], cefrLevel: 'B1' },
  { word: 'influence', partOfSpeech: 'noun', meaning: 'the power to affect people or events', example: 'Social media has a big influence on teenagers.', collocations: ['under the influence', 'strong influence', 'influence on'], cefrLevel: 'B1' },
  { word: 'maintain', partOfSpeech: 'verb', meaning: 'to keep something in good condition', example: 'It is important to maintain a healthy lifestyle.', collocations: ['maintain quality', 'maintain contact', 'maintain balance'], cefrLevel: 'B1' },
  { word: 'obvious', partOfSpeech: 'adjective', meaning: 'easily perceived or understood; clear', example: 'The answer to the question is quite obvious.', collocations: ['quite obvious', 'most obvious', 'obvious reason'], cefrLevel: 'B1' },
  { word: 'participate', partOfSpeech: 'verb', meaning: 'to take part in an activity or event', example: 'Everyone is encouraged to participate in the discussion.', collocations: ['participate in', 'actively participate', 'participate fully'], cefrLevel: 'B1' },
  { word: 'reliable', partOfSpeech: 'adjective', meaning: 'consistently good in quality or performance', example: 'She is a very reliable employee who always meets deadlines.', collocations: ['reliable source', 'reliable information', 'highly reliable'], cefrLevel: 'B1' },
  { word: 'struggle', partOfSpeech: 'verb', meaning: 'to try hard to do something difficult', example: 'Many students struggle with mathematics.', collocations: ['struggle with', 'daily struggle', 'struggle to'], cefrLevel: 'B1' },
  { word: 'benefit', partOfSpeech: 'noun', meaning: 'an advantage gained from something', example: 'Regular exercise has many health benefits.', collocations: ['health benefit', 'mutual benefit', 'benefit from'], cefrLevel: 'B1' },
  { word: 'volunteer', partOfSpeech: 'noun', meaning: 'a person who freely offers to do something', example: 'We need more volunteers to help at the event.', collocations: ['volunteer work', 'volunteer organization', 'volunteer for'], cefrLevel: 'B1' },
  { word: 'aware', partOfSpeech: 'adjective', meaning: 'having knowledge of a situation or fact', example: 'Are you aware of the new company policy?', collocations: ['well aware', 'become aware', 'aware of'], cefrLevel: 'B1' },
  { word: 'essential', partOfSpeech: 'adjective', meaning: 'absolutely necessary; extremely important', example: 'Water is essential for survival.', collocations: ['essential part', 'absolutely essential', 'essential information'], cefrLevel: 'B1' },
  { word: 'flexible', partOfSpeech: 'adjective', meaning: 'able to change or be changed easily', example: 'Our company offers flexible working hours.', collocations: ['flexible schedule', 'flexible approach', 'more flexible'], cefrLevel: 'B1' },

  // ==================== B2 Words (25) ====================
  { word: 'acquisition', partOfSpeech: 'noun', meaning: 'the process of gaining something', example: 'Language acquisition is faster for young children.', collocations: ['language acquisition', 'data acquisition', 'knowledge acquisition'], cefrLevel: 'B2' },
  { word: 'comprehensive', partOfSpeech: 'adjective', meaning: 'including everything that is necessary', example: 'The report provides a comprehensive analysis of the market.', collocations: ['comprehensive study', 'comprehensive review', 'comprehensive plan'], cefrLevel: 'B2' },
  { word: 'distinguish', partOfSpeech: 'verb', meaning: 'to recognize or treat as different', example: 'It is important to distinguish between facts and opinions.', collocations: ['distinguish between', 'distinguish from', 'easily distinguish'], cefrLevel: 'B2' },
  { word: 'inevitable', partOfSpeech: 'adjective', meaning: 'certain to happen and unable to be avoided', example: 'Change is inevitable in any growing organization.', collocations: ['inevitable result', 'inevitable change', 'seem inevitable'], cefrLevel: 'B2' },
  { word: 'controversy', partOfSpeech: 'noun', meaning: 'prolonged public disagreement or heated discussion', example: 'The new policy caused a lot of controversy.', collocations: ['cause controversy', 'political controversy', 'avoid controversy'], cefrLevel: 'B2' },
  { word: 'emphasize', partOfSpeech: 'verb', meaning: 'to give special importance to something', example: 'The teacher emphasized the importance of practice.', collocations: ['emphasize importance', 'strongly emphasize', 'emphasize the need'], cefrLevel: 'B2' },
  { word: 'fluctuate', partOfSpeech: 'verb', meaning: 'to change frequently in size, amount, or quality', example: 'Oil prices fluctuate depending on global demand.', collocations: ['prices fluctuate', 'fluctuate widely', 'fluctuate between'], cefrLevel: 'B2' },
  { word: 'phenomenon', partOfSpeech: 'noun', meaning: 'a fact or situation that is observed to exist', example: 'Global warming is a well-documented phenomenon.', collocations: ['natural phenomenon', 'social phenomenon', 'cultural phenomenon'], cefrLevel: 'B2' },
  { word: 'acknowledge', partOfSpeech: 'verb', meaning: 'to accept or admit the truth of something', example: 'She acknowledged that the project had some flaws.', collocations: ['publicly acknowledge', 'acknowledge the problem', 'acknowledge receipt'], cefrLevel: 'B2' },
  { word: 'collaborate', partOfSpeech: 'verb', meaning: 'to work together with others on a project', example: 'The two companies collaborated on the research project.', collocations: ['collaborate with', 'collaborate on', 'closely collaborate'], cefrLevel: 'B2' },
  { word: 'contemporary', partOfSpeech: 'adjective', meaning: 'belonging to or occurring in the present', example: 'The museum features contemporary art from local artists.', collocations: ['contemporary art', 'contemporary society', 'contemporary music'], cefrLevel: 'B2' },
  { word: 'elaborate', partOfSpeech: 'adjective', meaning: 'involving many carefully arranged parts or details', example: 'They planned an elaborate ceremony for the anniversary.', collocations: ['elaborate plan', 'elaborate design', 'more elaborate'], cefrLevel: 'B2' },
  { word: 'fundamental', partOfSpeech: 'adjective', meaning: 'forming a necessary base or core; of central importance', example: 'Freedom of speech is a fundamental right.', collocations: ['fundamental right', 'fundamental change', 'fundamental principle'], cefrLevel: 'B2' },
  { word: 'hypothesis', partOfSpeech: 'noun', meaning: 'a proposed explanation based on limited evidence', example: 'The scientist tested her hypothesis through experiments.', collocations: ['test a hypothesis', 'working hypothesis', 'support the hypothesis'], cefrLevel: 'B2' },
  { word: 'implement', partOfSpeech: 'verb', meaning: 'to put a plan or decision into effect', example: 'The government plans to implement new tax reforms.', collocations: ['implement a plan', 'implement changes', 'implement policy'], cefrLevel: 'B2' },
  { word: 'legitimate', partOfSpeech: 'adjective', meaning: 'conforming to the law or rules; valid', example: 'The company has a legitimate claim to the property.', collocations: ['legitimate concern', 'legitimate business', 'perfectly legitimate'], cefrLevel: 'B2' },
  { word: 'notorious', partOfSpeech: 'adjective', meaning: 'famous for something bad', example: 'The city is notorious for its heavy traffic.', collocations: ['notorious criminal', 'notorious for', 'notoriously difficult'], cefrLevel: 'B2' },
  { word: 'preliminary', partOfSpeech: 'adjective', meaning: 'happening before the main event as preparation', example: 'The preliminary results of the study look promising.', collocations: ['preliminary results', 'preliminary stage', 'preliminary investigation'], cefrLevel: 'B2' },
  { word: 'reluctant', partOfSpeech: 'adjective', meaning: 'unwilling and hesitant', example: 'He was reluctant to admit he had made a mistake.', collocations: ['reluctant to', 'somewhat reluctant', 'reluctant agreement'], cefrLevel: 'B2' },
  { word: 'sophisticated', partOfSpeech: 'adjective', meaning: 'having a complex and refined understanding', example: 'The software uses sophisticated algorithms to detect fraud.', collocations: ['sophisticated technology', 'sophisticated approach', 'highly sophisticated'], cefrLevel: 'B2' },
  { word: 'undermine', partOfSpeech: 'verb', meaning: 'to gradually weaken or damage', example: 'Constant criticism can undermine a person\'s confidence.', collocations: ['undermine confidence', 'undermine authority', 'undermine efforts'], cefrLevel: 'B2' },
  { word: 'advocate', partOfSpeech: 'verb', meaning: 'to publicly recommend or support', example: 'She advocates for equal access to education.', collocations: ['strongly advocate', 'advocate for', 'advocate change'], cefrLevel: 'B2' },
  { word: 'constraint', partOfSpeech: 'noun', meaning: 'a limitation or restriction', example: 'Budget constraints forced us to reduce the project scope.', collocations: ['budget constraint', 'time constraint', 'impose constraints'], cefrLevel: 'B2' },
  { word: 'dilemma', partOfSpeech: 'noun', meaning: 'a situation requiring a difficult choice between options', example: 'She faced a dilemma between her career and family.', collocations: ['moral dilemma', 'face a dilemma', 'ethical dilemma'], cefrLevel: 'B2' },
  { word: 'scrutiny', partOfSpeech: 'noun', meaning: 'critical observation or examination', example: 'The company\'s finances are under close scrutiny.', collocations: ['close scrutiny', 'public scrutiny', 'under scrutiny'], cefrLevel: 'B2' },

  // ==================== C1 Words (25) ====================
  { word: 'ambiguous', partOfSpeech: 'adjective', meaning: 'open to more than one interpretation', example: 'The contract language was deliberately ambiguous.', collocations: ['ambiguous meaning', 'deliberately ambiguous', 'ambiguous statement'], cefrLevel: 'C1' },
  { word: 'consolidate', partOfSpeech: 'verb', meaning: 'to combine things to make them more effective', example: 'The company consolidated its operations in one city.', collocations: ['consolidate power', 'consolidate position', 'consolidate gains'], cefrLevel: 'C1' },
  { word: 'deteriorate', partOfSpeech: 'verb', meaning: 'to become progressively worse', example: 'His health began to deteriorate rapidly.', collocations: ['health deteriorate', 'conditions deteriorate', 'rapidly deteriorate'], cefrLevel: 'C1' },
  { word: 'unprecedented', partOfSpeech: 'adjective', meaning: 'never done or known before', example: 'The pandemic caused unprecedented disruption worldwide.', collocations: ['unprecedented scale', 'unprecedented growth', 'unprecedented challenge'], cefrLevel: 'C1' },
  { word: 'superficial', partOfSpeech: 'adjective', meaning: 'existing or occurring at or on the surface; not deep', example: 'His analysis was superficial and lacked depth.', collocations: ['superficial analysis', 'superficial wound', 'superficial knowledge'], cefrLevel: 'C1' },
  { word: 'paradox', partOfSpeech: 'noun', meaning: 'a seemingly contradictory statement that may be true', example: 'It is a paradox that technology connects yet isolates us.', collocations: ['apparent paradox', 'paradox of choice', 'interesting paradox'], cefrLevel: 'C1' },
  { word: 'juxtapose', partOfSpeech: 'verb', meaning: 'to place close together for contrasting effect', example: 'The artist juxtaposed modern and classical elements.', collocations: ['juxtapose ideas', 'juxtapose images', 'sharply juxtaposed'], cefrLevel: 'C1' },
  { word: 'substantiate', partOfSpeech: 'verb', meaning: 'to provide evidence to support a claim', example: 'She was unable to substantiate her allegations.', collocations: ['substantiate claims', 'substantiate evidence', 'fail to substantiate'], cefrLevel: 'C1' },
  { word: 'alleviate', partOfSpeech: 'verb', meaning: 'to make suffering or a problem less severe', example: 'The new policy was designed to alleviate poverty.', collocations: ['alleviate pain', 'alleviate poverty', 'alleviate stress'], cefrLevel: 'C1' },
  { word: 'complacent', partOfSpeech: 'adjective', meaning: 'showing smug satisfaction with oneself without awareness of danger', example: 'The team became complacent after their early successes.', collocations: ['become complacent', 'complacent attitude', 'dangerously complacent'], cefrLevel: 'C1' },
  { word: 'discrepancy', partOfSpeech: 'noun', meaning: 'a difference between things that should be the same', example: 'There was a discrepancy between the two financial reports.', collocations: ['significant discrepancy', 'discrepancy between', 'explain the discrepancy'], cefrLevel: 'C1' },
  { word: 'exacerbate', partOfSpeech: 'verb', meaning: 'to make a problem or situation worse', example: 'The drought exacerbated the country\'s food crisis.', collocations: ['exacerbate the problem', 'further exacerbate', 'exacerbate tensions'], cefrLevel: 'C1' },
  { word: 'meticulous', partOfSpeech: 'adjective', meaning: 'showing great attention to detail', example: 'She is meticulous in her research and never overlooks anything.', collocations: ['meticulous planning', 'meticulous attention', 'meticulous records'], cefrLevel: 'C1' },
  { word: 'proliferate', partOfSpeech: 'verb', meaning: 'to increase rapidly in number or amount', example: 'Social media platforms have proliferated over the past decade.', collocations: ['rapidly proliferate', 'continue to proliferate', 'proliferate across'], cefrLevel: 'C1' },
  { word: 'resilient', partOfSpeech: 'adjective', meaning: 'able to recover quickly from difficulties', example: 'Children are remarkably resilient and adapt to change quickly.', collocations: ['remarkably resilient', 'resilient economy', 'emotionally resilient'], cefrLevel: 'C1' },
  { word: 'succinct', partOfSpeech: 'adjective', meaning: 'briefly and clearly expressed', example: 'Her presentation was succinct and well-organized.', collocations: ['succinct summary', 'clear and succinct', 'succinct explanation'], cefrLevel: 'C1' },
  { word: 'transcend', partOfSpeech: 'verb', meaning: 'to go beyond the limits of something', example: 'Great art transcends cultural and linguistic barriers.', collocations: ['transcend boundaries', 'transcend limitations', 'transcend culture'], cefrLevel: 'C1' },
  { word: 'unequivocal', partOfSpeech: 'adjective', meaning: 'leaving no doubt; unambiguous', example: 'The evidence was unequivocal ??the defendant was guilty.', collocations: ['unequivocal support', 'unequivocal evidence', 'unequivocal statement'], cefrLevel: 'C1' },
  { word: 'volatile', partOfSpeech: 'adjective', meaning: 'liable to change rapidly and unpredictably', example: 'The stock market has been extremely volatile this year.', collocations: ['volatile market', 'volatile situation', 'highly volatile'], cefrLevel: 'C1' },
  { word: 'circumvent', partOfSpeech: 'verb', meaning: 'to find a way around an obstacle or rule', example: 'They found ways to circumvent the new regulations.', collocations: ['circumvent the law', 'circumvent regulations', 'circumvent restrictions'], cefrLevel: 'C1' },
  { word: 'corroborate', partOfSpeech: 'verb', meaning: 'to confirm or give support to a statement or theory', example: 'The witness testimony corroborated the evidence.', collocations: ['corroborate evidence', 'corroborate a story', 'independently corroborate'], cefrLevel: 'C1' },
  { word: 'delineate', partOfSpeech: 'verb', meaning: 'to describe or indicate precisely', example: 'The report clearly delineates the project responsibilities.', collocations: ['clearly delineate', 'delineate boundaries', 'delineate roles'], cefrLevel: 'C1' },
  { word: 'inherent', partOfSpeech: 'adjective', meaning: 'existing as a natural or basic part of something', example: 'There are inherent risks in any new business venture.', collocations: ['inherent risk', 'inherent in', 'inherent weakness'], cefrLevel: 'C1' },
  { word: 'pragmatic', partOfSpeech: 'adjective', meaning: 'dealing with things sensibly and realistically', example: 'We need a pragmatic approach to solving this problem.', collocations: ['pragmatic approach', 'pragmatic solution', 'pragmatic decision'], cefrLevel: 'C1' },
  { word: 'repercussion', partOfSpeech: 'noun', meaning: 'an unintended consequence of an event or action', example: 'The scandal had serious repercussions for the government.', collocations: ['serious repercussions', 'political repercussions', 'face repercussions'], cefrLevel: 'C1' },

  // ==================== C2 Words (25) ====================
  { word: 'quintessential', partOfSpeech: 'adjective', meaning: 'representing the most perfect example of something', example: 'She is the quintessential modern entrepreneur.', collocations: ['quintessential example', 'quintessential British', 'quintessential experience'], cefrLevel: 'C2' },
  { word: 'ubiquitous', partOfSpeech: 'adjective', meaning: 'present, appearing, or found everywhere', example: 'Smartphones have become ubiquitous in modern society.', collocations: ['ubiquitous presence', 'ubiquitous technology', 'become ubiquitous'], cefrLevel: 'C2' },
  { word: 'perfunctory', partOfSpeech: 'adjective', meaning: 'carried out with minimum effort or thought', example: 'He gave a perfunctory nod and continued working.', collocations: ['perfunctory glance', 'perfunctory greeting', 'perfunctory manner'], cefrLevel: 'C2' },
  { word: 'ephemeral', partOfSpeech: 'adjective', meaning: 'lasting for a very short time', example: 'Fame can be ephemeral, disappearing as quickly as it comes.', collocations: ['ephemeral nature', 'ephemeral beauty', 'ephemeral moment'], cefrLevel: 'C2' },
  { word: 'surreptitious', partOfSpeech: 'adjective', meaning: 'kept secret, especially because of disapproval', example: 'She cast a surreptitious glance at her phone during the meeting.', collocations: ['surreptitious glance', 'surreptitious manner', 'surreptitious activity'], cefrLevel: 'C2' },
  { word: 'inexorable', partOfSpeech: 'adjective', meaning: 'impossible to stop or prevent', example: 'The inexorable march of technology changes everything.', collocations: ['inexorable rise', 'inexorable decline', 'inexorable march'], cefrLevel: 'C2' },
  { word: 'recalcitrant', partOfSpeech: 'adjective', meaning: 'having an uncooperative attitude', example: 'The recalcitrant student refused to follow the rules.', collocations: ['recalcitrant attitude', 'recalcitrant behavior', 'recalcitrant child'], cefrLevel: 'C2' },
  { word: 'perspicacious', partOfSpeech: 'adjective', meaning: 'having a ready insight into and understanding of things', example: 'Her perspicacious analysis impressed the board.', collocations: ['perspicacious observer', 'perspicacious analysis', 'perspicacious reader'], cefrLevel: 'C2' },
  { word: 'obfuscate', partOfSpeech: 'verb', meaning: 'to make something unclear or difficult to understand', example: 'The politician tried to obfuscate the truth with vague answers.', collocations: ['obfuscate the truth', 'deliberately obfuscate', 'obfuscate the issue'], cefrLevel: 'C2' },
  { word: 'pernicious', partOfSpeech: 'adjective', meaning: 'having a harmful effect in a gradual or subtle way', example: 'The pernicious effects of misinformation are well documented.', collocations: ['pernicious influence', 'pernicious effect', 'pernicious myth'], cefrLevel: 'C2' },
  { word: 'sagacious', partOfSpeech: 'adjective', meaning: 'having or showing keen mental discernment and good judgment', example: 'The sagacious investor foresaw the market crash.', collocations: ['sagacious advice', 'sagacious decision', 'sagacious leader'], cefrLevel: 'C2' },
  { word: 'tenacious', partOfSpeech: 'adjective', meaning: 'tending to keep a firm hold; persistent', example: 'Her tenacious pursuit of justice inspired many people.', collocations: ['tenacious pursuit', 'tenacious grip', 'tenacious defender'], cefrLevel: 'C2' },
  { word: 'vicissitude', partOfSpeech: 'noun', meaning: 'a change of circumstances or fortune', example: 'The vicissitudes of life taught him to be grateful.', collocations: ['vicissitudes of life', 'vicissitudes of fortune', 'many vicissitudes'], cefrLevel: 'C2' },
  { word: 'anachronistic', partOfSpeech: 'adjective', meaning: 'belonging to a period other than the one portrayed', example: 'Some consider the monarchy an anachronistic institution.', collocations: ['anachronistic view', 'seem anachronistic', 'anachronistic institution'], cefrLevel: 'C2' },
  { word: 'belligerent', partOfSpeech: 'adjective', meaning: 'hostile and aggressive', example: 'His belligerent tone made negotiations impossible.', collocations: ['belligerent attitude', 'belligerent behavior', 'belligerent nation'], cefrLevel: 'C2' },
  { word: 'capricious', partOfSpeech: 'adjective', meaning: 'given to sudden and unaccountable changes of mood', example: 'The capricious weather made planning outdoor events difficult.', collocations: ['capricious nature', 'capricious weather', 'capricious decision'], cefrLevel: 'C2' },
  { word: 'deleterious', partOfSpeech: 'adjective', meaning: 'causing harm or damage', example: 'Smoking has deleterious effects on lung health.', collocations: ['deleterious effects', 'deleterious impact', 'potentially deleterious'], cefrLevel: 'C2' },
  { word: 'equanimity', partOfSpeech: 'noun', meaning: 'mental calmness and composure in difficult situations', example: 'She faced the crisis with remarkable equanimity.', collocations: ['maintain equanimity', 'remarkable equanimity', 'with equanimity'], cefrLevel: 'C2' },
  { word: 'insidious', partOfSpeech: 'adjective', meaning: 'proceeding in a gradual, subtle way but with harmful effects', example: 'The insidious spread of fake news undermines trust in media.', collocations: ['insidious nature', 'insidious threat', 'insidious influence'], cefrLevel: 'C2' },
  { word: 'magnanimous', partOfSpeech: 'adjective', meaning: 'very generous or forgiving, especially toward a rival', example: 'The winner was magnanimous in victory, praising the opponent.', collocations: ['magnanimous gesture', 'magnanimous in victory', 'magnanimous spirit'], cefrLevel: 'C2' },
  { word: 'ostensible', partOfSpeech: 'adjective', meaning: 'stated or appearing to be true but not necessarily so', example: 'The ostensible reason for the meeting was budget planning.', collocations: ['ostensible purpose', 'ostensible reason', 'ostensibly neutral'], cefrLevel: 'C2' },
  { word: 'propensity', partOfSpeech: 'noun', meaning: 'a natural tendency to behave in a particular way', example: 'He has a propensity for taking risks in business.', collocations: ['propensity for', 'natural propensity', 'propensity to'], cefrLevel: 'C2' },
  { word: 'reticent', partOfSpeech: 'adjective', meaning: 'not revealing thoughts or feelings readily', example: 'She was reticent about discussing her personal life.', collocations: ['reticent about', 'naturally reticent', 'reticent to speak'], cefrLevel: 'C2' },
  { word: 'sycophant', partOfSpeech: 'noun', meaning: 'a person who acts obsequiously to gain advantage', example: 'The boss was surrounded by sycophants who never challenged him.', collocations: ['political sycophant', 'mere sycophant', 'sycophantic behavior'], cefrLevel: 'C2' },
  { word: 'verisimilitude', partOfSpeech: 'noun', meaning: 'the appearance of being true or real', example: 'The novel achieves verisimilitude through detailed historical research.', collocations: ['achieve verisimilitude', 'air of verisimilitude', 'sense of verisimilitude'], cefrLevel: 'C2' },
];

export const VOCABULARY_WORKBOOK_OVERRIDES: Record<string, WorkbookVocabOverride> = JSON.parse(String.raw`{
  "family": {
    "meaningKo": "가족",
    "example": "I have a large family.",
    "exampleKo": "나는 대가족이 있습니다.",
    "collocations": "a large family, family members"
  },
  "friend": {
    "meaningKo": "친구",
    "example": "He is my best friend.",
    "exampleKo": "그는 나의 가장 친한 친구입니다.",
    "collocations": "a best friend, a good friend"
  },
  "teacher": {
    "meaningKo": "선생님",
    "example": "I like my English teacher.",
    "exampleKo": "나는 영어 선생님을 좋아해요.",
    "collocations": "an English teacher, a good teacher"
  },
  "food": {
    "meaningKo": "음식",
    "example": "I don't eat fast food.",
    "exampleKo": "나는 패스트 푸드를 먹지 않습니다.",
    "collocations": "fast food, healthy food"
  },
  "water": {
    "meaningKo": "물",
    "example": "Can I have some water?",
    "exampleKo": "물 좀 주시겠어요?",
    "collocations": ""
  },
  "house": {
    "meaningKo": "집",
    "example": "They live in a big house.",
    "exampleKo": "그들은 큰 집에 산다.",
    "collocations": "a big house"
  },
  "school": {
    "meaningKo": "학교",
    "example": "I walk to school.",
    "exampleKo": "나는 학교에 걸어간다.",
    "collocations": "walk to school, go to school"
  },
  "morning": {
    "meaningKo": "아침",
    "example": "I drink coffee every morning.",
    "exampleKo": "나는 매일 아침 커피를 마신다.",
    "collocations": "in the morning, this morning, tomorrow morning"
  },
  "time": {
    "meaningKo": "시간",
    "example": "What time is it?",
    "exampleKo": "지금은 몇시입니까?",
    "collocations": "have a good time, free time"
  },
  "mistake": {
    "meaningKo": "실수",
    "example": "I made a mistake.",
    "exampleKo": "제가 실수를 했습니다.",
    "collocations": "make a mistake"
  },
  "practice": {
    "meaningKo": "관행",
    "example": "I need speaking practice.",
    "exampleKo": "말하기 연습이 필요해요.",
    "collocations": ""
  },
  "work": {
    "meaningKo": "일하다",
    "example": "I start work at 9 o'clock.",
    "exampleKo": "나는 9시에 일을 시작합니다.",
    "collocations": "start work, go to work"
  },
  "book": {
    "meaningKo": "책",
    "example": "I am reading a book about pirates.",
    "exampleKo": "나는 해적에 관한 책을 읽고 있어요.",
    "collocations": ""
  },
  "money": {
    "meaningKo": "돈",
    "example": "Do you have money?",
    "exampleKo": "돈이 있나요?",
    "collocations": "spend money, save money"
  },
  "car": {
    "meaningKo": "자동차",
    "example": "I drive a blue car to work every day.",
    "exampleKo": "나는 매일 파란 차를 타고 출근한다.",
    "collocations": "drive a car, by car"
  },
  "journey": {
    "meaningKo": "여행",
    "example": "The journey to Bexley is long.",
    "exampleKo": "Bexley까지의 여정은 길다.",
    "collocations": ""
  },
  "happy": {
    "meaningKo": "행복하다",
    "example": "Happy birthday to you!",
    "exampleKo": "생일 축하해요!",
    "collocations": "happy birthday, feel happy"
  },
  "cold": {
    "meaningKo": "추운",
    "example": "I need a coat for the cold weather.",
    "exampleKo": "추운 날씨에 코트가 필요해요.",
    "collocations": "cold weather, a cold drink"
  },
  "small": {
    "meaningKo": "작은",
    "example": "My grandmother lives in a small flat near the river.",
    "exampleKo": "우리 할머니는 강 근처의 작은 아파트에 살고 있어요.",
    "collocations": ""
  },
  "dangerous": {
    "meaningKo": "위험한",
    "example": "It is dangerous to swim here.",
    "exampleKo": "여기서 수영하는 것은 위험합니다.",
    "collocations": ""
  },
  "good": {
    "meaningKo": "좋은",
    "example": "That is a good idea.",
    "exampleKo": "좋은 생각이에요.",
    "collocations": "good idea, good luck"
  },
  "important": {
    "meaningKo": "중요한",
    "example": "It is important to listen.",
    "exampleKo": "듣는 것이 중요합니다.",
    "collocations": "important to do something, an important person"
  },
  "open": {
    "meaningKo": "열려 있는",
    "example": "The shop is open until 9pm.",
    "exampleKo": "가게는 저녁 9시까지 영업합니다.",
    "collocations": ""
  },
  "today": {
    "meaningKo": "오늘",
    "example": "What are you doing today?",
    "exampleKo": "오늘 뭐해?",
    "collocations": ""
  },
  "recipe": {
    "meaningKo": "레시피",
    "example": "Follow the recipe.",
    "exampleKo": "조리법을 따르십시오.",
    "collocations": "follow a recipe"
  },
  "benefit": {
    "meaningKo": "혜택",
    "example": "Exercise has many benefits.",
    "exampleKo": "운동에는 많은 이점이 있습니다.",
    "collocations": ""
  },
  "experience": {
    "meaningKo": "경험",
    "example": "I have three years' experience.",
    "exampleKo": "나는 3년의 경험을 가지고 있습니다.",
    "collocations": ""
  },
  "accident": {
    "meaningKo": "사고",
    "example": "He had an accident.",
    "exampleKo": "그는 사고를 당했습니다.",
    "collocations": "have an accident, car accident"
  },
  "temperature": {
    "meaningKo": "온도",
    "example": "The doctor took my temperature.",
    "exampleKo": "의사가 내 체온을 재더군요.",
    "collocations": "take a temperature, high temperature"
  },
  "adventure": {
    "meaningKo": "모험",
    "example": "It was a big adventure.",
    "exampleKo": "그것은 큰 모험이었습니다.",
    "collocations": "go on an adventure"
  },
  "comfortable": {
    "meaningKo": "편안한",
    "example": "This is a very comfortable chair.",
    "exampleKo": "이것은 매우 편안한 의자입니다.",
    "collocations": "a comfortable chair/bed"
  },
  "polite": {
    "meaningKo": "예의 바른",
    "example": "It is polite to say thanks.",
    "exampleKo": "감사하다고 말하는 것이 예의입니다.",
    "collocations": "polite to"
  },
  "brilliant": {
    "meaningKo": "멋진",
    "example": "That is a brilliant idea.",
    "exampleKo": "정말 좋은 생각이에요.",
    "collocations": "brilliant idea"
  },
  "typical": {
    "meaningKo": "전형적인",
    "example": "It was a typical day.",
    "exampleKo": "전형적인 날이었습니다.",
    "collocations": "typical day"
  },
  "especially": {
    "meaningKo": "특히",
    "example": "I love Italian food, especially pasta.",
    "exampleKo": "나는 이탈리아 음식, 특히 파스타를 좋아합니다.",
    "collocations": ""
  },
  "volunteer": {
    "meaningKo": "자원 봉사자",
    "example": "He works as a volunteer at the hospital.",
    "exampleKo": "그는 병원에서 자원봉사자로 일하고 있다.",
    "collocations": "work as a volunteer"
  },
  "environment": {
    "meaningKo": "환경",
    "example": "We must protect the environment.",
    "exampleKo": "우리는 환경을 보호해야 합니다.",
    "collocations": "protect the environment"
  },
  "attitude": {
    "meaningKo": "태도",
    "example": "He has a positive attitude to life.",
    "exampleKo": "그는 삶에 대해 긍정적인 태도를 가지고 있습니다.",
    "collocations": ""
  },
  "generation": {
    "meaningKo": "세대",
    "example": "I think the young generation gets too much criticism.",
    "exampleKo": "젊은 세대가 너무 비난을 많이 받는 것 같아요.",
    "collocations": ""
  },
  "influence": {
    "meaningKo": "영향",
    "example": "My parents had a big influence on me.",
    "exampleKo": "부모님은 나에게 큰 영향을 미쳤습니다.",
    "collocations": ""
  },
  "opportunity": {
    "meaningKo": "기회",
    "example": "It is a great opportunity.",
    "exampleKo": "좋은 기회입니다.",
    "collocations": ""
  },
  "aware": {
    "meaningKo": "알고 있는",
    "example": "Are you aware of the rules?",
    "exampleKo": "규칙을 알고 있나요?",
    "collocations": ""
  },
  "reliable": {
    "meaningKo": "믿을 수 있는",
    "example": "He is a very reliable worker.",
    "exampleKo": "그는 매우 믿음직한 일꾼이다.",
    "collocations": ""
  },
  "responsible": {
    "meaningKo": "책임이 있는",
    "example": "Who is responsible for this mess?",
    "exampleKo": "이 혼란의 책임은 누구에게 있습니까?",
    "collocations": ""
  },
  "essential": {
    "meaningKo": "필수적인",
    "example": "Water is essential for life.",
    "exampleKo": "물은 생명에 필수적입니다.",
    "collocations": ""
  },
  "obvious": {
    "meaningKo": "분명한",
    "example": "The answer was obvious to everyone.",
    "exampleKo": "대답은 누구에게나 명백했습니다.",
    "collocations": ""
  },
  "controversy": {
    "meaningKo": "논쟁",
    "example": "The decision caused a great deal of controversy.",
    "exampleKo": "이 결정은 많은 논란을 불러일으켰다.",
    "collocations": "cause controversy, a subject of controversy"
  },
  "demand": {
    "meaningKo": "수요",
    "example": "There is a high demand for skilled workers in the tech industry.",
    "exampleKo": "기술 산업에는 숙련된 인력에 대한 수요가 높습니다.",
    "collocations": "high demand, meet demand, supply and demand"
  },
  "consequence": {
    "meaningKo": "결과",
    "example": "You must accept the consequences of your actions.",
    "exampleKo": "당신은 당신의 행동의 결과를 받아들여야 합니다.",
    "collocations": "consequences of, serious consequences"
  },
  "phenomenon": {
    "meaningKo": "현상",
    "example": "Globalisation is a relatively new phenomenon.",
    "exampleKo": "세계화는 비교적 새로운 현상입니다.",
    "collocations": "natural phenomenon, a recent phenomenon"
  },
  "sophisticated": {
    "meaningKo": "정교한",
    "example": "The organisation uses sophisticated technology to monitor emissions.",
    "exampleKo": "조직은 정교한 기술을 사용하여 배출량을 모니터링합니다.",
    "collocations": ""
  },
  "comprehensive": {
    "meaningKo": "포괄적인",
    "example": "The government published a comprehensive review of immigration policy.",
    "exampleKo": "정부는 이민 정책에 대한 종합적인 검토를 발표했습니다.",
    "collocations": "comprehensive review"
  },
  "fundamental": {
    "meaningKo": "근본적인",
    "example": "The report identified fundamental flaws in the current system.",
    "exampleKo": "보고서는 현재 시스템의 근본적인 결함을 식별했습니다.",
    "collocations": "fundamental flaw/difference"
  },
  "significant": {
    "meaningKo": "중요한",
    "example": "The study revealed a significant correlation between variables.",
    "exampleKo": "이 연구에서는 변수들 사이에 유의미한 상관관계가 있음이 밝혀졌습니다.",
    "collocations": "significant correlation"
  },
  "contemporary": {
    "meaningKo": "현대의",
    "example": "The museum features an exhibition of contemporary art.",
    "exampleKo": "박물관에서는 현대 미술을 전시하고 있습니다.",
    "collocations": ""
  },
  "inevitable": {
    "meaningKo": "불가피한",
    "example": "Many analysts believe that further regulation is inevitable.",
    "exampleKo": "많은 분석가들은 추가 규제가 불가피하다고 믿고 있습니다.",
    "collocations": ""
  },
  "flexible": {
    "meaningKo": "유연한",
    "example": "Employers increasingly offer flexible working arrangements.",
    "exampleKo": "고용주들은 점점 더 유연한 근무 방식을 제공하고 있습니다.",
    "collocations": "flexible working"
  },
  "acquisition": {
    "meaningKo": "인수",
    "example": "The company announced the acquisition of a rival firm.",
    "exampleKo": "회사는 경쟁사 인수를 발표했습니다.",
    "collocations": ""
  },
  "hypothesis": {
    "meaningKo": "가설",
    "example": "The researchers will now test this hypothesis in a controlled experiment.",
    "exampleKo": "이제 연구자들은 통제된 실험을 통해 이 가설을 테스트할 예정입니다.",
    "collocations": "test a hypothesis, support a hypothesis"
  },
  "advocate": {
    "meaningKo": "지지하다",
    "example": "She became a passionate advocate for educational reform.",
    "exampleKo": "그녀는 교육 개혁을 열정적으로 옹호하는 사람이 되었습니다.",
    "collocations": ""
  },
  "scrutiny": {
    "meaningKo": "정밀한 조사",
    "example": "The government's actions came under public scrutiny.",
    "exampleKo": "정부의 조치는 대중의 감시를 받았다.",
    "collocations": "public scrutiny, under scrutiny"
  },
  "constraint": {
    "meaningKo": "강제",
    "example": "Budget constraints limited their options.",
    "exampleKo": "예산 제약으로 인해 옵션이 제한되었습니다.",
    "collocations": "budget constraints, time constraints"
  },
  "dilemma": {
    "meaningKo": "양도 논법",
    "example": "The situation posed a profound ethical dilemma.",
    "exampleKo": "상황은 심각한 윤리적 딜레마를 야기했습니다.",
    "collocations": "ethical dilemma"
  },
  "inherent": {
    "meaningKo": "고유의",
    "example": "There are inherent risks in any business venture.",
    "exampleKo": "모든 사업에는 위험이 내재되어 있습니다.",
    "collocations": "inherent risk, inherent problem"
  },
  "legitimate": {
    "meaningKo": "정당한",
    "example": "That's a legitimate concern.",
    "exampleKo": "그것은 정당한 우려입니다.",
    "collocations": "legitimate concern, legitimate question"
  },
  "preliminary": {
    "meaningKo": "예비의",
    "example": "The preliminary results look promising.",
    "exampleKo": "예비 결과는 유망해 보입니다.",
    "collocations": ""
  },
  "notorious": {
    "meaningKo": "유명한",
    "example": "The area is notorious for crime.",
    "exampleKo": "이 지역은 범죄로 악명이 높습니다.",
    "collocations": ""
  },
  "reluctant": {
    "meaningKo": "주저하는",
    "example": "He was reluctant to discuss the matter.",
    "exampleKo": "그는 그 문제에 대해 논의하기를 꺼렸다.",
    "collocations": ""
  },
  "elaborate": {
    "meaningKo": "정교한",
    "example": "They created an elaborate plan.",
    "exampleKo": "그들은 정교한 계획을 세웠습니다.",
    "collocations": ""
  },
  "unprecedented": {
    "meaningKo": "전례 없는",
    "example": "The floods were on an unprecedented scale.",
    "exampleKo": "홍수는 전례 없는 규모였습니다.",
    "collocations": "unprecedented level, unprecedented scale"
  },
  "sycophant": {
    "meaningKo": "아첨꾼",
    "example": "The dictator was surrounded by fawning sycophants who agreed with his every word.",
    "exampleKo": "독재자는 그의 모든 말에 동의하는 아첨하는 아첨꾼들에 둘러싸여 있었습니다.",
    "collocations": ""
  },
  "paradox": {
    "meaningKo": "역설",
    "example": "It is one of the great paradoxes of life that we must work hard to relax.",
    "exampleKo": "긴장을 풀기 위해 열심히 노력해야 한다는 것은 인생의 가장 큰 역설 중 하나입니다.",
    "collocations": ""
  },
  "repercussion": {
    "meaningKo": "반향",
    "example": "The scandal had serious repercussions for his political career.",
    "exampleKo": "이 스캔들은 그의 정치 경력에 심각한 영향을 미쳤다.",
    "collocations": ""
  },
  "vicissitude": {
    "meaningKo": "변천",
    "example": "Despite the many vicissitudes of life, they remained optimistic.",
    "exampleKo": "삶의 많은 우여곡절에도 불구하고 그들은 낙관적인 태도를 유지했습니다.",
    "collocations": ""
  },
  "equanimity": {
    "meaningKo": "평정",
    "example": "She accepted the unexpected news with remarkable equanimity.",
    "exampleKo": "그녀는 뜻밖의 소식을 놀랍도록 침착하게 받아들였습니다.",
    "collocations": "with equanimity"
  },
  "propensity": {
    "meaningKo": "경향",
    "example": "She has a propensity for making careless mistakes.",
    "exampleKo": "그녀는 부주의한 실수를 저지르는 경향이 있습니다.",
    "collocations": ""
  },
  "verisimilitude": {
    "meaningKo": "있을 법함",
    "example": "The novel's historical verisimilitude was praised by critics.",
    "exampleKo": "소설의 역사적 진실성은 비평가들로부터 칭찬을 받았습니다.",
    "collocations": ""
  },
  "discrepancy": {
    "meaningKo": "모순",
    "example": "There is a significant discrepancy between the two sets of accounts.",
    "exampleKo": "두 계정 세트 간에는 상당한 차이가 있습니다.",
    "collocations": ""
  },
  "magnanimous": {
    "meaningKo": "도량이 큰",
    "example": "It was a magnanimous gesture for him to forgive his rival.",
    "exampleKo": "그의 경쟁자를 용서하는 것은 그가 관대한 몸짓이었습니다.",
    "collocations": "magnanimous gesture, magnanimous in victory"
  },
  "meticulous": {
    "meaningKo": "꼼꼼한",
    "example": "The project required meticulous attention to detail.",
    "exampleKo": "이 프로젝트는 세부 사항에 세심한 주의가 필요했습니다.",
    "collocations": "meticulous attention to detail"
  },
  "perspicacious": {
    "meaningKo": "통찰력 있는",
    "example": "Her perspicacious analysis revealed flaws others had missed.",
    "exampleKo": "그녀의 통찰력 있는 분석은 다른 사람들이 놓친 결함을 밝혀냈습니다.",
    "collocations": "perspicacious analysis"
  },
  "quintessential": {
    "meaningKo": "전형적인",
    "example": "This novel is the quintessential example of his early style.",
    "exampleKo": "이 소설은 그의 초기 스타일의 전형적인 예이다.",
    "collocations": "quintessential example"
  },
  "resilient": {
    "meaningKo": "탄력있는",
    "example": "Children are remarkably resilient to change.",
    "exampleKo": "아이들은 변화에 놀라울 정도로 탄력적입니다.",
    "collocations": ""
  },
  "sagacious": {
    "meaningKo": "현명한",
    "example": "She was known for her sagacious advice.",
    "exampleKo": "그녀는 현명한 조언으로 유명했습니다.",
    "collocations": "sagacious advice"
  },
  "tenacious": {
    "meaningKo": "끈기 있는",
    "example": "She was tenacious in pursuing her goals.",
    "exampleKo": "그녀는 자신의 목표를 추구하는 데 끈질기게 노력했습니다.",
    "collocations": ""
  },
  "reticent": {
    "meaningKo": "말이 없는",
    "example": "He was very reticent about his past.",
    "exampleKo": "그는 자신의 과거에 대해 매우 과묵했습니다.",
    "collocations": ""
  },
  "insidious": {
    "meaningKo": "교활한",
    "example": "The disease has an insidious onset, with symptoms appearing gradually.",
    "exampleKo": "이 질병은 서서히 발병하며 증상은 점차적으로 나타납니다.",
    "collocations": "insidious threat/influence/onset"
  },
  "belligerent": {
    "meaningKo": "교전국",
    "example": "He became increasingly belligerent as the evening wore on.",
    "exampleKo": "저녁이 지날수록 그는 점점 더 호전적으로 변했습니다.",
    "collocations": ""
  },
  "capricious": {
    "meaningKo": "변덕스러운",
    "example": "The weather here is notoriously capricious.",
    "exampleKo": "이곳의 날씨는 변덕스럽기로 악명 높습니다.",
    "collocations": ""
  },
  "recalcitrant": {
    "meaningKo": "고집 불통",
    "example": "The recalcitrant child refused to cooperate with his parents.",
    "exampleKo": "반항적인 아이는 부모의 협조를 거부했습니다.",
    "collocations": ""
  },
  "complacent": {
    "meaningKo": "안일한",
    "example": "We must not become complacent about security.",
    "exampleKo": "우리는 보안에 안주해서는 안 됩니다.",
    "collocations": ""
  },
  "succinct": {
    "meaningKo": "간결",
    "example": "Please give me a succinct summary of the report.",
    "exampleKo": "보고서에 대한 간략한 요약을 부탁드립니다.",
    "collocations": "succinct summary/account"
  },
  "deleterious": {
    "meaningKo": "해로운",
    "example": "Smoking has deleterious effects on health.",
    "exampleKo": "흡연은 건강에 해로운 영향을 미칩니다.",
    "collocations": ""
  },
  "pernicious": {
    "meaningKo": "유해한",
    "example": "The pernicious effects of the policy became apparent over time.",
    "exampleKo": "정책의 해로운 효과는 시간이 지나면서 명백해졌습니다.",
    "collocations": ""
  },
  "ostensible": {
    "meaningKo": "표면상의",
    "example": "The ostensible reason for his visit was business, but he was really seeing a friend.",
    "exampleKo": "방문 목적은 사업상의 이유로 방문했지만 실제로는 친구를 만나러 온 것이었습니다.",
    "collocations": "ostensible reason/purpose"
  },
  "perfunctory": {
    "meaningKo": "형식적인",
    "example": "He gave a perfunctory nod of acknowledgement.",
    "exampleKo": "그는 형식적으로 고개를 끄덕이며 인정했다.",
    "collocations": "perfunctory manner/glance"
  },
  "ubiquitous": {
    "meaningKo": "어디에나 있는",
    "example": "The ubiquitous presence of CCTV cameras has become a feature of modern life.",
    "exampleKo": "CCTV 카메라의 존재는 현대인의 삶의 특징이 되었습니다.",
    "collocations": ""
  },
  "ephemeral": {
    "meaningKo": "일시적인",
    "example": "Fame in the world of pop music is often ephemeral.",
    "exampleKo": "팝 음악계에서 명성은 일시적인 경우가 많습니다.",
    "collocations": ""
  },
  "anachronistic": {
    "meaningKo": "시대착오적인",
    "example": "The film contained several anachronistic details, such as a character wearing a modern watch.",
    "exampleKo": "영화에는 현대식 시계를 차고 있는 캐릭터 등 시대착오적인 여러 디테일이 담겨 있었다.",
    "collocations": "anachronistic detail/element"
  },
  "inexorable": {
    "meaningKo": "무정한",
    "example": "The inexorable march of time cannot be stopped.",
    "exampleKo": "거침없는 시간의 행진은 멈출 수 없다.",
    "collocations": "inexorable march/rise"
  },
  "superficial": {
    "meaningKo": "표면적인",
    "example": "The report provided only a superficial analysis of a complex issue.",
    "exampleKo": "보고서는 복잡한 문제에 대한 피상적인 분석만을 제공했습니다.",
    "collocations": ""
  },
  "surreptitious": {
    "meaningKo": "은밀한",
    "example": "She took a surreptitious glance at her phone during the meeting.",
    "exampleKo": "그녀는 회의 중에 휴대폰을 은밀하게 살펴보았습니다.",
    "collocations": ""
  },
  "unequivocal": {
    "meaningKo": "명백하다",
    "example": "The government's message on the issue was unequivocal.",
    "exampleKo": "이 문제에 대한 정부의 메시지는 분명했습니다.",
    "collocations": ""
  },
  "volatile": {
    "meaningKo": "휘발성 물질",
    "example": "The political situation in the region remained highly volatile.",
    "exampleKo": "이 지역의 정치적 상황은 여전히 매우 불안정했습니다.",
    "collocations": ""
  }
}`);

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


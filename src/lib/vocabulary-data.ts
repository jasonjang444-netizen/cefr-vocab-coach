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

